import { apiRoutes } from "@shared/constants/apiRoutes";

import problems1 from "./problems1.json";
import problems2 from "./problems2.json";
import problems3 from "./problems3.json";
import submitAnswer1 from "./submitAnswer1.json";
import submitAnswer2 from "./submitAnswer2.json";
import submitAnswer3 from "./submitAnswer3.json";
import workbook from "./workbook.json";
import article1 from "./article1.json";
import articleWithWorkbook1 from "./articleWithWorkbook1.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [apiRoutes.problems + "get1"]: problems1,
  [apiRoutes.problems + "get2"]: problems2,
  [apiRoutes.problems + "get3"]: problems3,
  [apiRoutes.submitAnswer + "1"]: submitAnswer1,
  [apiRoutes.submitAnswer + "2"]: submitAnswer2,
  [apiRoutes.submitAnswer + "3"]: submitAnswer3,
  [apiRoutes.workbook]: workbook,
  [apiRoutes.article + "1"]: article1,
  [apiRoutes.articleWithWorkbook + "1"]: articleWithWorkbook1,
};
