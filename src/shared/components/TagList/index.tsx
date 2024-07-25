import Tag from "../Tag";

interface TagListProps {
  tagTexts: string[];
}
export default function TagList({ tagTexts }: TagListProps) {
  return (
    <div className="mt-[4px] flex gap-[12px]">
      {tagTexts.map((tag) => (
        <Tag key={tag} title={tag} />
      ))}
    </div>
  );
}
