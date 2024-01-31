import { BlobServiceClient } from '@azure/storage-blob';
import { makeUpdateEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-update-employee-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';
import { env } from '@/env';
import { makeGetEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-get-employee-profile-use-case';

export async function updateEmployeeAvatar(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmployeeAvatarQuerySchema = z.object({
    id: z.string(),
  });

  const avatar_file = request.file;
  const fileData = await fs.readFile(avatar_file.path);

  const { id } = updateEmployeeAvatarQuerySchema.parse(request.params);

  try {
    const getEmployeeProfile = makeGetEmployeeProfileUseCase();
    const updateEmployeeAvatar = makeUpdateEmployeeProfileUseCase();

    const { employee } = await getEmployeeProfile.execute({
      employeeId: id,
    });

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      env.AZURE_STORAGE_CONNECTION_STRING,
    );

    const containerClient = blobServiceClient.getContainerClient(
      'gesbstoragecontainer',
    );

    if (employee.avatar) {
      const blobToDelete = containerClient.getBlockBlobClient(employee.avatar);
      await blobToDelete.deleteIfExists();
    }

    const blockBlobClient = containerClient.getBlockBlobClient(
      avatar_file.filename,
    );

    await blockBlobClient.upload(fileData, fileData.length);

    await updateEmployeeAvatar.execute({
      employeeId: id,
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
