interface OverviewSectionProps {
    overview: string
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
    return (
        <div className="flex items-start px-[20px]">
            <div className="flex flex-col space-y-[3px]">
                <span className="body2-regular text-black">개요</span>
                <span className="body1-medium max-w-xs">{overview}</span>
            </div>
            <div className="ml-auto"></div>
        </div>
    )
}