import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import SupabaseProvider from './supabase-provider'

import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import TailwindIndicator from '@/components/tailwind-indicator'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'InfoJobs questionnaire',
    description: 'Improve your candidate selection process with us',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <html lang="en">
            <body className={inter.className}>
                <SupabaseProvider session={session}>
                    <Header />
                    {children}
                    <TailwindIndicator />
                </SupabaseProvider>
            </body>
        </html>
    )
}
