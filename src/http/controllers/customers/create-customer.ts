import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-create-costumer-use-case';
import { makeCreateProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-create-project-manager-use-case';

export async function createCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCustomerBodySchema = z.object({
    name: z.string(),
    project_managers: z.array(
      z.object({
        name: z.string(),
      }),
    ),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { name, project_managers } = createCustomerBodySchema.parse(
    request.body,
  );

  try {
    const createCustomer = makeCreateCustomerUseCase();
    const createProjectManager = makeCreateProjectManagerUseCase();

    const { customer } = await createCustomer.execute({
      name,
      userName: user.name,
    });

    for (const project_manager of project_managers) {
      const { name } = project_manager;

      await createProjectManager.execute({
        customerId: customer.id,
        name,
      });
    }

    return reply.status(201).send({
      customer,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
