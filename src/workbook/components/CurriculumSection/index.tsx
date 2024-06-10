import { ICurriculumItem } from "@workbook/types"
import CurriculumItem from "../CurriculumItem"

interface CurriculumSectionProps {
    curriculumItems: ICurriculumItem[]
}

export default function CurriculumSection({ curriculumItems }: CurriculumSectionProps) {
    return (
        <div className="flex flex-col space-y-[8px] w-full px-[20px]">
            <span className="body2-regular text-black">커리큘럼</span>
            <div>
                {
                    curriculumItems.map((item, idx) => {
                        return (
                            <CurriculumItem key={item.id} day={idx + 1} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}