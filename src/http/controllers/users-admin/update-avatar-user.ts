import { supabase } from '@/lib/supabase';
import { makeUpdateUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';

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
    const updateUserAvatar = makeUpdateUserProfileUseCase();

    await updateUserAvatar.execute({
      userId: id,
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
