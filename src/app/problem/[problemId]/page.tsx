import AnswerChoiceList from "@problem/components/AnswerChoiceList";
import LottieWithContext from "@problem/components/LottieWithContext";
import ProblemExplanation from "@problem/components/ProblemExplanation";
import ProblemTagList from "@problem/components/ProblemTagList";
import ProblemTitle from "@problem/components/ProblemTitle";

export default function ProblemPage() {
  return (
    <div className="relative flex h-fit flex-col">
      <LottieWithContext />
      <ProblemTagList />
      <ProblemTitle />
      <AnswerChoiceList />
      <ProblemExplanation className="my-[30px]" />
    </div>
  );
}
