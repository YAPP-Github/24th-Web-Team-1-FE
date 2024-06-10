import ShareIcon  from "public/assets/icon36/share_36.svg"

interface TitleSectionProps {
    category: string
    title: string
    editors: string[]
}


export default function TitleSection ({ category, title, editors }: TitleSectionProps) {
    return (
        <div className="flex flex-col px-[20px]">
            <div></div>
            <div className="flex flex-row">
                <div className="">
                    <h1 className="h1-bold text-black text-[28px]">{title}</h1>
                </div>
                <div className="ml-auto">
                    <ShareIcon />
                </div>
            </div>
            <div className="flex flex-row space-x-[8px] mt-[16px]">
                <div className="flex">
                    <span className="text-text-gray2 sub2-bold">작가</span>
                </div>
                <div className="flex flex-row">
                    {
                        editors.map((editor, idx) => {
                            return (
                                (idx === editors.length - 1) ? (
                                    <span key={idx} className="text-text-gray1 sub2-bold">{editor}</span>
                                ) : (
                                    <div key={idx + `${editor}`}>
                                        <span className="text-text-gray1 sub2-bold">{editor}</span>
                                        <span className="text-text-gray1 sub2-bold"> · </span>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}