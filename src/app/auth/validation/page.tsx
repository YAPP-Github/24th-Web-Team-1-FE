import SignupProgress from '@auth/components/SignupProgress';
import FewLogo from 'public/enterlogo.svg'

export default function ValidationPage() {
  return (
    <div className="flex h-full flex-col items-center">
      <FewLogo />
      <span className='mt-[63px] mb-[20px] text-text-gray1 h3-bold'>soomin9106@naver.com</span>
      <SignupProgress />
    </div>
  );
}
