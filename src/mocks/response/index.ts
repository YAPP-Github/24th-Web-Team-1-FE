import { apiRoutes } from "@shared/constants/apiRoutes";

import problems from "./problems.json";
import quiz from "./quiz.json";
import submitAnswer from "./submitAnswer.json";
import tags from "./tags.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [apiRoutes.quiz]: quiz,
  [apiRoutes.tags]: tags,
  [apiRoutes.problems]: problems,
  [apiRoutes.submitAnswer]: submitAnswer,
};
