import { apiRoutes } from "@shared/constants/apiRoutes";

import quiz from "./quiz.json";
import tags from "./tags.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [apiRoutes.quiz]: quiz,
  [apiRoutes.tags]: tags,
};
