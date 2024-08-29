import { ArticleDropDown } from "../ArticleDropDown";
import CancelButton from "@common/components/CancelButton";

interface ArticleDropDownWrapperProps {
  toggleArticle: boolean;
  handleToggleArticle: () => void;
}

export default function ArticleDropDownWrapper({
  toggleArticle,
  handleToggleArticle,
}: ArticleDropDownWrapperProps) {
  return (
    <>
      {toggleArticle && (
        <div className="fixed inset-0 z-50 flex justify-center bg-white">
          <div className="relative w-full max-w-[480px] bg-white">
            <CancelButton
              handleToggle={handleToggleArticle}
              className="absolute right-0 top-0 p-4"
            />
            <ArticleDropDown />
          </div>
        </div>
      )}
    </>
  );
}
