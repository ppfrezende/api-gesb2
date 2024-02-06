import { makeUpdateUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { env } from '@/env';
import { storageS3Client } from '@/lib/S3';

export async function updateUserAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserAvatarQuerySchema = z.object({
    id: z.string(),
  });

  const avatar_file = request.file;
  const fileData = await fs.readFile(avatar_file.path);

  const { id } = updateUserAvatarQuerySchema.parse(request.params);

  try {
    const getUserProfile = makeGetUserProfileUseCase();
    const updateUserAvatar = makeUpdateUserProfileUseCase();

    const { user } = await getUserProfile.execute({
      userId: id,
    });

    if (user.avatar) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: user.avatar,
      });
      await storageS3Client.send(deleteCommand);
    }

    const upload = new Upload({
      client: storageS3Client,
      params: {
        Bucket: env.AWS_BUCKET_NAME,
        Key: avatar_file.filename,
        Body: fileData,
      },
    });

    await upload.done();

    await updateUserAvatar.execute({
      userId: id,
      data: {
        avatar: avatar_file.filename,
      },
    });
    return reply.status(200).send({ upload: 'completed' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
