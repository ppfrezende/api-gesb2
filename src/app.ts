import fastify from 'fastify';
import cors from '@fastify/cors';
import { usersRoutes } from './http/controllers/users-admin/routes';
import { ZodError } from 'zod';
import { env } from './env';
import multer from 'fastify-multer';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { employeesRoutes } from './http/controllers/employees/routes';
import { serviceProvidersRoutes } from './http/controllers/service-providers/routes';
import { sitesRoutes } from './http/controllers/sites/routes';
import { timeSheetsRoutes } from './http/controllers/timesheets/routes';
import { techniciansRoutes } from './http/controllers/technicians/routes';
import { interventionsRoutes } from './http/controllers/interventions/routes';
import { interventionExpensesRoutes } from './http/controllers/interventions/intervention-expenses/routes';
import { customersRoutes } from './http/controllers/customers/route';
import { invoicesToCustomerRoutes } from './http/controllers/invoices-to-customer/routes';
import { technicianExpensesRoutes } from './http/controllers/technicians/technician-expenses/routes';
import { customerProjectManegerRoutes } from './http/controllers/customers/customer-project-mangers/routes';
import { billingOrdersRoutes } from './http/controllers/customers/billing-orders/routes';

export const app = fastify();

app.register(multer.contentParser);

app.register(
  cors,
  {
    exposedHeaders: ['x-total-count', 'x-page-count'],
  } /*{
  origin: true,
  credentials: true,
}*/,
);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(employeesRoutes);
app.register(serviceProvidersRoutes);
app.register(techniciansRoutes);
app.register(technicianExpensesRoutes);
app.register(billingOrdersRoutes);
app.register(sitesRoutes);
app.register(timeSheetsRoutes);
app.register(customersRoutes);
app.register(interventionsRoutes);
app.register(interventionExpensesRoutes);
app.register(customerProjectManegerRoutes);
app.register(invoicesToCustomerRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
