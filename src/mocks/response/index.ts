import { apiRoutes } from "@shared/constants/apiRoutes";

import problems from "./problems.json";
import problems2 from "./problems2.json";
import submitAnswer from "./submitAnswer.json";
import workbook from "./workbook.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [apiRoutes.problems + "get"]: problems,
  [apiRoutes.problems + "2"]: problems2,
  [apiRoutes.submitAnswer]: submitAnswer,
  [apiRoutes.workbook]: workbook,
};
