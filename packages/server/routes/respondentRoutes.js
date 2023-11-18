import { Router } from "express";

import {
  getAllResponseByFormId,
  getResponseById,
  postResponse,
} from "../controllers/respondentController.js";

const router = Router();

router.route("/:formId").get(getAllResponseByFormId).post(postResponse);

router.route("/response/:responseId").get(getResponseById);

export default router;
