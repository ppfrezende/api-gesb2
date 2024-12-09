import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      role: 'ADMIN' | 'SERVICE' | 'RH' | 'FINANCE' | 'GUEST' | 'COMERCIAL';
    };
    skill: {
      sub: string;
    };
  }
}
