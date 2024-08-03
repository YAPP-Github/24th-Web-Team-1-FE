import { UNAUTH_LINK } from "@main/constants/dropdownMenu";
import { cn } from "@shared/utils/cn";

export function DropDownMenuItemList() {
  // TODO : 로그인 여부따라서 메뉴 제어 필요
  const MENU_ITEM_LIST = UNAUTH_LINK;
  const lastIdx = MENU_ITEM_LIST.length - 1;
  return (
    <ul className="absolute left-0 top-[66px] z-20 h-screen w-full bg-white">
      {MENU_ITEM_LIST.map(({ title, component }, idx) => (
        <li
          key={`link-to-${idx}`}
          className={cn(
            "flex flex-col justify-center",
            "sub2-bold min-h-[66px] w-full px-[20px] py-[10px]",
            lastIdx !== idx && "border-b-[0.5px] border-text-gray3",
          )}
        >
          {component({ title })}
        </li>
      ))}
    </ul>
  );
}
