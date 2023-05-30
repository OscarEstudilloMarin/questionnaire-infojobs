import { UserSignUpForm } from '@/components/user-sign-up-form'
import BackButton from '@/components/back-button'

export const metadata = {
    title: 'Candidate register',
    description: 'Improve your candidate selection process with us',
}

export default function CandidateRegisterPage() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center px-10">
            <div className="absolute left-4 top-4 md:left-8 md:top-8">
                <BackButton />
            </div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Registro de candidato
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Introduce tus datos
                    </p>
                </div>
                <UserSignUpForm from="candidate" />
            </div>
        </div>
    )
}
