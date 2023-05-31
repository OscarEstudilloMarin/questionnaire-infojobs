import { UserSignUpForm } from '@/components/user-sign-up-form'
import BackButton from '@/components/back-button'

export const metadata = {
    title: 'Employer register',
    description: 'Improve your candidate selection process with us',
}

export default function EmployerRegisterPage() {
    return (
        <div>
            <BackButton />
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-5 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Registro de empresa
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Introduce tus datos
                    </p>
                </div>
                <UserSignUpForm from="employer" />
            </div>
        </div>
    )
}
