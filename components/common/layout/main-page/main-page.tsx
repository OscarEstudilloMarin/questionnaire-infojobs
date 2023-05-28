import { PropsWithChildren } from 'react'
import BasePage from '../base-page/base-page'
import MainLayout from '../main-layout/main-layout'

export type MainPageProps = PropsWithChildren

const MainPage = ({ children }: MainPageProps): JSX.Element => {
    return (
        <MainLayout>
            <BasePage>{children}</BasePage>
        </MainLayout>
    )
}

export default MainPage
