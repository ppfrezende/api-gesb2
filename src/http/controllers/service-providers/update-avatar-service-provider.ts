import { makeGetServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-service-provider-use-case';
import { makeUpdateServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-update-service-provider-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';
import { env } from '@/env';
import { Upload } from '@aws-sdk/lib-storage';
import { storageS3Client } from '@/lib/S3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function updateServiceProviderAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateServiceProviderAvatarQuerySchema = z.object({
    id: z.string(),
  });

  const avatar_file = request.file;
  const fileData = await fs.readFile(avatar_file.path);

  const { id } = updateServiceProviderAvatarQuerySchema.parse(request.params);

  try {
    const getServiceProviderProfile = makeGetServiceProviderProfileUseCase();
    const updateServiceProviderAvatar =
      makeUpdateServiceProviderProfileUseCase();

    const { service_provider } = await getServiceProviderProfile.execute({
      serviceProviderId: id,
    });

    if (service_provider.avatar) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: service_provider.avatar,
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

    await updateServiceProviderAvatar.execute({
      serviceProviderId: id,
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
