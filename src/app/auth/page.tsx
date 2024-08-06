import EmailForm from "@auth/components/EmailForm";
import LoginLogo from "@auth/components/LoginLogo";

export default function AuthPage() {
  return (
    <div className="flex h-full flex-col gap-[41px]">
      <LoginLogo />
      <EmailForm />
    </div>
  );
}
