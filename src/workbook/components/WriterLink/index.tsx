import Link from "next/link";

import React from "react";

interface WriterLinkProps {
  name: string;
  url: string;
  isLast: boolean;
}

export default function WriterLink({ name, url, isLast }: WriterLinkProps) {
  return (
    <>
      <Link target="blank" href={url} className="body1-medium text-text-gray1">
        {name}
      </Link>
      {!isLast && <span className="body1-medium text-text-gray1"> · </span>}
    </>
  );
}
