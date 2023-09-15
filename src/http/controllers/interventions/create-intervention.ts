import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-create-intervention-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeGetEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-get-employee-profile-use-case';
import { makeGetServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-get-service-provider-use-case';
import { makeGetPurchaseOrderUseCase } from '@/use-cases/_factories/purchase-orders_factories/make-get-purchase-order-use-case';

export async function createIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createInterventionBodySchema = z.object({
    description: z.string(),
    customer_email: z.string(),
    initial_at: z.coerce.date(),
    purchaseOrderId: z.string(),
    employeeId: z.string().optional(),
    serviceProviderId: z.string().optional(),
    siteId: z.string(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    description,
    customer_email,
    initial_at,
    purchaseOrderId,
    employeeId,
    serviceProviderId,
    siteId,
  } = createInterventionBodySchema.parse(request.body);

  try {
    const getPurchaseOrder = makeGetPurchaseOrderUseCase();
    const getEmployee = makeGetEmployeeProfileUseCase();
    const getServiceProvider = makeGetServiceProviderProfileUseCase();
    const createIntervention = makeCreateInterventionUseCase();

    const { purchase_order } = await getPurchaseOrder.execute({
      purchaseOrderId,
    });

    if (employeeId) {
      const { employee } = await getEmployee.execute({
        employeeId,
      });

      const { intervention } = await createIntervention.execute({
        description,
        customer_email,
        initial_at,
        purchaseOrderId: purchase_order.id,
        employeeId: employee.id,
        siteId,
        userEmail: user.email,
      });

      return reply.status(201).send({
        intervention,
      });
    } else if (serviceProviderId) {
      const { service_provider } = await getServiceProvider.execute({
        serviceProviderId,
      });

      const { intervention } = await createIntervention.execute({
        description,
        customer_email,
        initial_at,
        purchaseOrderId: purchase_order.id,
        serviceProviderId: service_provider.id,
        siteId,
        userEmail: user.email,
      });

      return reply.status(201).send({
        intervention,
      });
    }
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
