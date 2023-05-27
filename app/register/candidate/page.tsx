import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { UserSignUpForm } from '@/components/user-sign-up-form'

export const metadata = {
    title: 'Candidate register',
    description: 'Improve your candidate selection process with us',
}

export default function CandidateRegisterPage() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center px-10">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute left-4 top-4 md:left-8 md:top-8'
                )}
            >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Volver
                </>
            </Link>
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
