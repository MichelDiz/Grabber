import { Application, Router } from "./src/deps.ts";
import router from "./src/router.ts";
import { staticFileMidd } from "./src/staticFileMidd.ts";

const app = new Application();
const PORT = 8008;

app.use(staticFileMidd);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`\nServing at ... http://localhost:${PORT} \n`);
console.log(
  "You should NEVER expose this App/API or the Dgraph database to the public.",
);
console.log("This was meant to run locally or on LAN only.");

await app.listen({ port: PORT });
