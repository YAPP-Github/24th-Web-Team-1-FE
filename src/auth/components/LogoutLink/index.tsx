"use client"

import Link from "next/link";

import { useLogout } from "@auth/hooks/useLogout";

const LogoutLink = ({ title }: { title: string }) => {
  const handleLogout = useLogout();

  return (
    <Link href="/" onClick={(e) => {
      e.preventDefault();
      handleLogout();
    }}>
      {title}
    </Link>
  );
};

export default LogoutLink;

