import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import TailwindIndicator from '@/components/tailwind-indicator'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'

import '../styles/globals.css'
import BasePage from '@/components/common/layout/base-page/base-page'
import MainLayout from '@/components/common/layout/main-layout/main-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'InfoJobs questionnaire',
    description: 'Improve your candidate selection process with us',
    icons: {
        icon: '/favicon.ico',
    },
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <html lang="es">
            <head />
            <body className={`${inter.className} flex h-screen flex-col`}>
                <MainLayout>
                    <Header session={session ?? null} />
                    <BasePage>{children}</BasePage>
                    <Toaster />
                    <TailwindIndicator />
                </MainLayout>
            </body>
        </html>
    )
}
