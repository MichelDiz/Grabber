import {
    Router,
} from "./deps.ts";

import adminController from "./controllers/admin.ts";
import insertController from "./controllers/insert.ts";

const router = new Router();

router
.get("/configs", adminController.queryConfigs)
.get("/autosetup", adminController.setupSchema)
.post("/addconfigs", adminController.addConfigs)
.post("/add", insertController.watchLives)
.post("/watchChat", insertController.chatWatch)

export default router;
