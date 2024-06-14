import { ICurriculumItem } from "@workbook/types"

interface CurriculumItemProps {
    day: number
    item: ICurriculumItem
}

export default function CurriculumItem({ day, item }: CurriculumItemProps) {
    return (
        <div className="flex flex-row space-x-[20px] justify-start items-center border-b p-2.5">
            <span className="text-base font-bold">Day {day}</span>
            <span className="text-base text-text-gray1 overflow-hidden overflow-ellipsis whitespace-nowrap ml-2">
                {item.title}
            </span>
        </div>
    )
}