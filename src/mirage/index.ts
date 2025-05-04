import { createServer } from "miragejs";
import { handler } from "./handler";

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";
      handler(this);
    },
  });
}
