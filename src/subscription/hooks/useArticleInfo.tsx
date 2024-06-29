import { useEffect, useState } from "react"

import { getCookie } from "@subscription/utils"

export const useArticleInfo = () =>{
    const [articleId, setArticleId] = useState<string | undefined>(undefined)
    const [workbookId, setWorkbookId] = useState<string | undefined>(undefined)

    useEffect(function getArticleInfo () {
        const curArticleId = getCookie('articleId');
        const curWorkbookId = getCookie('workbookId');
        setArticleId(curArticleId);
        setWorkbookId(curWorkbookId)
    }, [])

    return {
        articleId, 
        workbookId
    }
}