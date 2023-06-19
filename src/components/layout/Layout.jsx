import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    return <>
        <header className='header'>
            <NavLink to='/'>Info</NavLink>
            <NavLink to='/game'>Game</NavLink>
            <NavLink to='/settings'>Settings</NavLink>
        </header>

        <Outlet/>
    </>
}

export default Layout;