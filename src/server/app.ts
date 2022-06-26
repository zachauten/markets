import {
  Application,
  ApplicationOptions,
  Context,
  Router,
  Status,
} from "../../deps.ts";
import { InitialState } from "./models.ts";
import * as middleware from "./middleware.ts";
import * as routes from "./routes.ts";

export function app(state: ApplicationOptions<InitialState>) {
  const router = new Router()
    .get(routes.Routes.HEALTH, (ctx: Context) => {
      ctx.response.status = Status.OK;
    })
    .get(routes.Routes.INDEX, routes.idx);
  const app = new Application<InitialState>(state)
    .use(router.allowedMethods())
    .use(middleware.logger)
    .use(middleware.timing)
    .use(router.routes());
  app.addEventListener("error", (event) => {
    event.context?.throw(Status.InternalServerError);
    console.error(event.error);
  });
  return app;
}
