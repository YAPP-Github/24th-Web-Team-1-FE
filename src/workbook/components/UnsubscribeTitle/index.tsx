import { UNSUBSCRIBE_TITLES } from "@workbook/constants/unsubscribe";

export default function UnsubscribeTitle () {
    return (
        <header className="flex">
            <h1 className="h1-bold">
                {UNSUBSCRIBE_TITLES.TITLE_NEWS_LETTER} <br />
                {UNSUBSCRIBE_TITLES.TITLE_CANCEL}
            </h1>
        </header>
    )
}