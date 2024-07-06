import { CurriculumInfo } from "@workbook/types";

import CurriculumItem from "../CurriculumItem";

interface CurriculumSectionProps {
  curriculumItems: CurriculumInfo[];
}

export default function CurriculumSection({
  curriculumItems,
}: CurriculumSectionProps) {
  return (
    <section className="flex w-full flex-col space-y-[8px] px-[20px]">
      <h2 className="body2-regular text-black">커리큘럼</h2>
      <div>
        {curriculumItems.map((item, idx) => (
          <CurriculumItem key={item.id} day={idx + 1} item={item} />
        ))}
      </div>
    </section>
  );
}
