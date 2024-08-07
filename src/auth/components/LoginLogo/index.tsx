import { INTRO } from '@auth/constants/auth'
import FewLogo from 'public/enterlogo.svg'


export default function LoginLogo () {
    return (
        <div className="flex flex-col items-center gap-y-[22px]">
            <FewLogo />
            <span className='text-gray1 text-[13px] font-medium'>{INTRO}</span>
        </div>
    )
}