import { useEffect,useState } from 'react';

import { getWorkbookId } from '@workbook/utils';

const useWorkbookId = (pathname: string) => {
  const [workbookId, setWorkbookId] = useState<string>("");

  useEffect(function setWorkbookIdByPathname () {
    const id = getWorkbookId(pathname);
    setWorkbookId(id);
  }, [pathname]);

  return workbookId;
};

export default useWorkbookId;
