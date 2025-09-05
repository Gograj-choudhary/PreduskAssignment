import { Footer } from "../UI/Footer"
import { Header } from "../UI/Header"
import {Outlet} from "react-router-dom"


export const AppLayout = ()=>{
    return (
        <div>
            <Header/>
            <main className="pt-16"></main>
            <Outlet/>
            <Footer/>
        </div>
    )
}