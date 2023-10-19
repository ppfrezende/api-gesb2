import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-update-customer-use-case';
import { makeGetProjectManagersListByCustomerIdUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-get-project-manager-by-customer-id-use-case';
import { makeDeleteProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-delete-project-manager-use-case';
import { makeCreateProjectManagerUseCase } from '@/use-cases/_factories/customers_factories/project-managers_factories/make-create-project-manager-use-case';

export async function updateCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCustomerBodySchema = z.object({
    name: z.string().optional(),
    project_managers: z
      .array(
        z.object({
          name: z.string().optional(),
        }),
      )
      .optional(),
  });

  const updateCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const { name, project_managers } = updateCustomerBodySchema.parse(
    request.body,
  );

  const { customerId } = updateCustomerQuerySchema.parse(request.params);

  try {
    const updateCustomer = makeUpdateCustomerUseCase();
    const getProjectManagerByCustomerId =
      makeGetProjectManagersListByCustomerIdUseCase();
    const deleteProjectManager = makeDeleteProjectManagerUseCase();
    const createProjectManager = makeCreateProjectManagerUseCase();

    const { customer_project_managers } =
      await getProjectManagerByCustomerId.execute({
        customerId: customerId,
      });

    if (customer_project_managers) {
      for (const project_manager of customer_project_managers) {
        const { id } = project_manager;

        await deleteProjectManager.execute({
          projectManagerId: id,
        });
      }
    }

    if (project_managers) {
      for (const project_manager of project_managers) {
        const { name } = project_manager;

        await createProjectManager.execute({
          customerId: customerId,
          name,
        });
      }
    }

    const updatedCustomer = await updateCustomer.execute({
      customerId: customerId,
      data: {
        name,
      },
    });

    return reply.status(201).send(updatedCustomer);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
