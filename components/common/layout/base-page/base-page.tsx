import { PrimitiveDivProps } from '@radix-ui/react-toast'

interface BasePageProps extends Omit<PrimitiveDivProps, 'className'> {}

const BasePage = ({ children, ...rest }: BasePageProps): JSX.Element => {
    return (
        <div
            className="mx-auto flex min-h-screen max-w-screen-xl flex-1 flex-col px-4 py-16"
            {...rest}
        >
            {children}
        </div>
    )
}

export default BasePage
