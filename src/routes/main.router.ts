import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

class MainRouter {
  userRouter: UserRouter;
  authRouter: AuthRouter;

  constructor() {
    this.userRouter = new UserRouter();
    this.authRouter = new AuthRouter();
  }

  private verifyToken = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };

  private addJwtPlugin = async (fastify: FastifyInstance) => {
    await fastify.register(fastifyJwt, {
      secret: process.env.TOKEN_SECRET as string,
    });

    await fastify.decorate("authenticate", this.verifyToken);
  };

  public routes = async (fastify: FastifyInstance) => {
    fastify.register(fp(this.addJwtPlugin));

    fastify.register(this.userRouter.routes, { prefix: "/user" });
    fastify.register(this.authRouter.routes, { prefix: "/auth" });
  };
}

export default MainRouter;
