import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
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
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <Toaster />
                <TailwindIndicator />
            </body>
        </html>
    )
}
