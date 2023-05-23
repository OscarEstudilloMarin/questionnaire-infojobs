import Image from 'next/image'
import { Button } from './ui/button'

const Header = () => {
    return (
        <header className="flex h-20 items-center justify-between bg-[#7F7FD5] bg-gradient-to-r from-[#00B4DB] to-[#0083B0] p-5">
            <Image
                src="/icons/ij-logo-default_primary.svg"
                alt="infojobs-icon"
                width={120}
                height={100}
            />
            <div className="flex gap-4">
                <Button variant="secondary" size="sm">
                    Acceso empresas
                </Button>
                <Button size="sm">Acceso candidatos</Button>
            </div>
        </header>
    )
}

export default Header
