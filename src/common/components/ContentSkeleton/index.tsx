import { Skeleton } from "@shared/components/ui/skeleton";

export default function ContentSkeleton ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Skeleton className={className} {...props} />
    )
}