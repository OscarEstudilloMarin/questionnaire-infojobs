import { PrimitiveDivProps } from '@radix-ui/react-toast'

export type MainLayoutProps = Omit<PrimitiveDivProps, 'className'>

const MainLayout = ({ children, ...rest }: MainLayoutProps): JSX.Element => {
    return (
        <div className="mx-auto my-0 w-full" {...rest}>
            {children}
        </div>
    )
}

export default MainLayout
