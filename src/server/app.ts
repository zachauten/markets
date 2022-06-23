import {
  Application,
  ApplicationOptions,
  Context,
  Router,
  Status,
} from "../../deps.ts";
import { InitialState } from "./models.ts";
import * as middleware from "./middleware.ts";
import * as routes from "./routes.tsx";

export function app(state: ApplicationOptions<InitialState>) {
  const router = new Router()
    .get(routes.Routes.HEALTH, (ctx: Context) => {
      ctx.response.status = Status.OK;
    });
  const app = new Application<InitialState>(state)
    .use(router.allowedMethods())
    .use(middleware.logger)
    .use(middleware.timing)
    .use(middleware.index)
    .use(router.routes());
  app.addEventListener("error", (event) => {
    console.error(event.error);
  });
  return app;
}
