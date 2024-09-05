import { XIcon } from "lucide-react";

import { DropDownMenuItemList } from "../DropDownMenuItemList";
import HamburgerMenu from "public/assets/icon/hamburgerMenu.svg";
interface DropdownMenuWrapperProps {
  toggleMenu: boolean;
  handleToggleMenu: () => void;
}
export default function DropDownMenuWrapper({
  toggleMenu,
  handleToggleMenu,
}: DropdownMenuWrapperProps) {
  return (
    <div>
      {toggleMenu ? (
        <XIcon
          width={36}
          height={36}
          data-testid="x-menu"
          className="mr-[23px]"
          onClick={handleToggleMenu}
        />
      ) : (
        <HamburgerMenu
          width={24}
          height={24}
          data-testid="hamburger-menu"
          className="mr-[28px]"
          onClick={handleToggleMenu}
        />
      )}
      {toggleMenu && <DropDownMenuItemList />}
    </div>
  );
}
