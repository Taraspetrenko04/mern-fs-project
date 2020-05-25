import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './style.scss';
import { AuthContext } from '../../context/Auth.context';


const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext) 
    
    
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return(
        <nav>
            <div className='nav__wrapper'>
                <a href='/' className='nav__logo'>Лого</a>
                <ul className='nav__list'>
                    <li><NavLink to='/create'>Создать</NavLink></li>
                    <li><NavLink to='/links'>Ссылки</NavLink></li>
                    <li><a href='/' onClick={ logoutHandler }>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar;