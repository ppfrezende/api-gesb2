import { makeUpdateEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-update-employee-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';
import { env } from '@/env';
import { makeGetEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-get-employee-profile-use-case';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { storageS3Client } from '@/lib/S3';
import { Upload } from '@aws-sdk/lib-storage';

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

    if (employee.avatar) {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: employee.avatar,
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
