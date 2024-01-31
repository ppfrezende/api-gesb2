import { BlobServiceClient } from '@azure/storage-blob';
import { makeUpdateUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';
import { env } from '@/env';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

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

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      env.AZURE_STORAGE_CONNECTION_STRING,
    );

    const containerClient = blobServiceClient.getContainerClient(
      'gesbstoragecontainer',
    );

    if (user.avatar) {
      const blobToDelete = containerClient.getBlockBlobClient(user.avatar);
      await blobToDelete.deleteIfExists();
    }

    const blockBlobClient = containerClient.getBlockBlobClient(
      avatar_file.filename,
    );

    await blockBlobClient.upload(fileData, fileData.length);

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
