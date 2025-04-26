import { createServer } from "miragejs";
import { handler } from "./handler";

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";
      handler(this); // Modularizamos los endpoints
    },
  });
}
