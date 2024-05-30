import { makeGetTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technician-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getTechnician(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTechnicianQuerySchema = z.object({
    technicianId: z.string(),
  });

  const { technicianId } = getTechnicianQuerySchema.parse(request.params);
  try {
    const getTechnicianUseCase = makeGetTechnicianUseCase();

    const { technician } = await getTechnicianUseCase.execute({
      technicianId: technicianId,
    });

    return reply.status(200).send({
      technician,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
