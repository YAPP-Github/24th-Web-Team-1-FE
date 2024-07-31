interface OverviewSectionProps {
  overview: string;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <section className="flex w-full items-start px-[20px]">
      <div className="flex w-full flex-col space-y-[3px]">
        <h2 className="body2-regular text-black">개요</h2>
        <p className="body1-medium">{overview}</p>
      </div>
    </section>
  );
}
