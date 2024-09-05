import { apiRoutes } from "@shared/constants/apiRoutes";

import article1 from "./article1.json";
import articleWithWorkbook1 from "./articleWithWorkbook1.json";
import members from "./members.json";
import category from "./category.json";
import mainWorkbooksEntire from "./mainWorkbooksEntire.json";
import problems1 from "./problems1.json";
import problems2 from "./problems2.json";
import problems3 from "./problems3.json";
import problemsWithArticleId1 from "./problemsWithArticleId1.json";
import submitAnswer1 from "./submitAnswer1.json";
import submitAnswer2 from "./submitAnswer2.json";
import submitAnswer3 from "./submitAnswer3.json";
import workbook from "./workbook.json";
import token from "./token.json";
import workbooksSubscription from "./workbooksSubscription.json";
import logout from "./logout.json";
import workbookToggleSubscription from "./workbookToggleSubscription.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [apiRoutes.problems + "get1"]: problems1,
  [apiRoutes.problems + "get2"]: problems2,
  [apiRoutes.problems + "get3"]: problems3,
  [apiRoutes.submitAnswer + "1"]: submitAnswer1,
  [apiRoutes.submitAnswer + "2"]: submitAnswer2,
  [apiRoutes.submitAnswer + "3"]: submitAnswer3,
  [apiRoutes.workbook]: workbook,
  [apiRoutes.workbooks + "entire"]: mainWorkbooksEntire,
  [apiRoutes.workbooksSubscription]: workbooksSubscription,
  [apiRoutes.article + "1"]: article1,
  [apiRoutes.articleWithWorkbook + "1"]: articleWithWorkbook1,
  [apiRoutes.problemsWithArticle + "1"]: problemsWithArticleId1,
  [apiRoutes.members]: members,
  [apiRoutes.category]: category,
  [apiRoutes.token]: token,
  [apiRoutes.articleCategory]: category,
  [apiRoutes.logout]: logout,
  [apiRoutes.workbookSubscription]: workbookToggleSubscription,
  [apiRoutes.workbookUnsubscription]: workbookToggleSubscription,
  [apiRoutes.workbookEmailDay]: workbookToggleSubscription,
  [apiRoutes.workbookEmailTime]: workbookToggleSubscription,
};
