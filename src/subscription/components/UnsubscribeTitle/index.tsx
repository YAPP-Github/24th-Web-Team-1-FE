import { UNSUBSCRIBE_TITLES } from "@subscription/constants/unsubscribe";

export default function UnsubscribeTitle () {
    return (
        <header className="flex">
            <h1 className="h2-bold">
                {UNSUBSCRIBE_TITLES.TITLE_NEWS_LETTER} <br />
                {UNSUBSCRIBE_TITLES.TITLE_CANCEL}
            </h1>
        </header>
    )
}