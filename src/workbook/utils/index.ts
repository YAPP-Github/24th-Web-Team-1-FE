export const buildUrl = (template: string, params: { [key: string]: any }) => {
    return template.replace(/:([a-zA-Z]+)/g, (_, key) => params[key]);
};

export const getWorkbookId = (url: string) => {
    const match = url.match(/\/workbook\/(\d+)/);

    if (match) {
        const workbookId = match[1];
        return workbookId
    } 

    return "1"
}