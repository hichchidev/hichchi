// noinspection JSIgnoredPromiseFromCall

import { AppModule } from "./app.module";
import configuration from "./core/config/configuration";
import { hichchiBootstrap } from "@hichchi/nest-core";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
hichchiBootstrap(AppModule, { allowedOrigins: configuration().app.allowedOrigins });
