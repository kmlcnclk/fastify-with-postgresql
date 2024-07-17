import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";

class AuthRouter {
  authController: AuthController;

  constructor() {
    this.authController = new AuthController();

    this.routes = this.routes.bind(this);
    this.addSchemas = this.addSchemas.bind(this);
  }

  public addSchemas(fastify: FastifyInstance) {
    fastify.addSchema({
      $id: "signInSchema",
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    });
  }

  public async routes(fastify: FastifyInstance) {
    this.addSchemas(fastify);

    fastify.post(
      "/sign-in",
      {
        schema: {
          body: { $ref: "signInSchema#" },
        },
      },
      this.authController.signIn
    );
  }
}

export default AuthRouter;
