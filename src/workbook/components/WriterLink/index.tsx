import Link from "next/link";

import React from "react";

interface WriterLinkProps {
  name: string;
  url: string;
  isLast: boolean;
}

const WriterLink: React.FC<WriterLinkProps> = ({ name, url, isLast }) => {
  return (
    <>
      <Link href={url} className="body1-medium text-text-gray1">
        {name}
      </Link>
      {!isLast && <span className="body1-medium text-text-gray1"> · </span>}
    </>
  );
};

export default WriterLink;
