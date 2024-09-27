import { cn } from "@shared/utils/cn";

import { NOT_FOUND_WORDS, wordStyle } from "@common/constants/notFound";

export default function NotFoundExplanation () {
    return (
        <section className="flex flex-col space-y-[8px] items-center">
            <div>
                <span className="text-black text-lg font-bold">{NOT_FOUND_WORDS.TITLE}</span>
            </div>
            <div className="flex flex-col space-y-[2px] items-center">
                <span className={cn(wordStyle)}>{NOT_FOUND_WORDS.WORDS_1}</span>
                <span className={cn(wordStyle)}>{NOT_FOUND_WORDS.WORDS_2}</span>
            </div>
        </section>
    )
}