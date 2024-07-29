import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
  DATABASE_URL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());

    try {
      await prisma.student.create({
        data: {
          roll: 156,
          name: "Srijit Bera",
          class: 10,
        },
      });

      const res = await prisma.student.findMany({});
      console.log(res);
      console.log(JSON.stringify(res));

      return new Response(`Students: ${JSON.stringify(res)}`, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(`Error: ${error}`, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  },
};
