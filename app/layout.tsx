import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import TailwindIndicator from '@/components/tailwind-indicator'

import '../styles/globals.css'

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
    return (
        <html lang="en">
            <head />
            <body className={`${inter.className} flex h-screen flex-col`}>
                <Header />
                <div className="flex flex-1">{children}</div>
                <Toaster />
                <TailwindIndicator />
            </body>
        </html>
    )
}
