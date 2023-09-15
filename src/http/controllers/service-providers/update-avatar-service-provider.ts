import { supabase } from '@/lib/supabase';
import { makeUpdateServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-update-service-provider-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';

import { z } from 'zod';

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
    const updateServiceProviderAvatar =
      makeUpdateServiceProviderProfileUseCase();

    await updateServiceProviderAvatar.execute({
      serviceProviderId: id,
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
