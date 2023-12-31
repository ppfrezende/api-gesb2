import { supabase } from '@/lib/supabase';
import { makeUpdateEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-update-employee-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';

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
    const updateEmployeAvatar = makeUpdateEmployeeProfileUseCase();

    await updateEmployeAvatar.execute({
      employeeId: id,
      data: {
        avatar: avatar_file.filename,
      },
    });

    await supabase.storage
      .from('gesb2/avatar')
      .upload(avatar_file.filename, fileData);

    return reply.status(200).send({ upload: 'completed' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
