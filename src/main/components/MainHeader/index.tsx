import FewLogo from "public/assets/icon/fewlogo.svg";
import HamburgerMenu from "public/assets/icon/hamburgerMenu.svg";
export default function MainHeader() {
  return (
    <div className="flex h-[66px] w-full items-center justify-between bg-main">
      <FewLogo width={32} height={32} className="ml-[17px]" />
      {/* TODO : 메뉴바 클릭시 노출되는 로직 작업해야함 */}
      <HamburgerMenu width={24} height={24} className="mr-[28px]" />
    </div>
  );
}
