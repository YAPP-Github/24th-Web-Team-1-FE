import { WorkbookInfo } from "@workbook/types";
import Image from "next/image";

export default function WorkbookMainImage({
  mainImageUrl,
}: Pick<WorkbookInfo, "mainImageUrl">) {
  return (
    <figure className="flex justify-center">
      <Image
        priority
        src={mainImageUrl}
        alt={"Workbook landing image"}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full object-contain"
      />
    </figure>
  );
}
