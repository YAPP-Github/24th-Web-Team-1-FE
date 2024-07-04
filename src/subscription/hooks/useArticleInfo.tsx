import { useEffect, useState } from "react"

import { getCookie } from "@subscription/utils"

export const useArticleInfo = () =>{
    const [articleId, setArticleId] = useState<string | null>(null)
    const [workbookId, setWorkbookId] = useState<string | null>(null)

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