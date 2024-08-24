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
        <div className="fixed inset-0 z-50 bg-white flex justify-center">
          <div className="relative w-full max-w-[480px] bg-white">
            <div className="absolute top-0 right-0 p-4">
              <CancelButton handleToggle={handleToggleArticle} />
            </div>
            <ArticleDropDown />
          </div>
        </div>
      )}
    </>
  );
}
