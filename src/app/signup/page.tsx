import SignupProgress from '@auth/components/SignupProgress';
import Logo from 'public/enterlogo.svg'

export default function SignupPage() {
  return (
    <div className="flex h-full flex-col items-center">
      <Logo />
      <span className='mt-[63px] mb-[20px] text-text-gray1 h3-bold'>soomin9106@naver.com</span>
      <SignupProgress />
    </div>
  );
}
