import React, {useState, useContext, useEffect } from 'react';
import './style.scss';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/Auth.context';
import { useMessage } from '../hooks/message.hook';

const AuthPage = () => {
    const auth = useContext(AuthContext); 
    const message = useMessage();
    const { request, error, clearError } = useHttp();
    const [ form, setForm ] = useState({
        email: 'email',
        password: 'password'
    })

    useEffect( ()=> {
        message(error);
        clearError();
    }, [error, message, clearError])
    


    const changeForm = (event) => {
        setForm( {
            ...form,
            [ event.target.name ]: event.target.value
         })
    }


    // api/auth/registr from backEnd-routes
    const registerHandler = async () => {
        try {
            const data = await request('api/auth/registr', 'POST', {...form});
        } catch (e) {}
    };


    // api/auth/login from backEnd-routes
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form});
            auth.login( data.token, data.userId )
        } catch (e) {}
    };


    return(
        <div className='auth'>
                <h2 className="auth__title">Авторизация</h2>
                <input className='auth__input'
                placeholder='enter E-mail'
                id='email'
                type='text'
                name='email'
                // value={form.email}
                onChange={ changeForm }
                ></input>
                <label>електронный адрес</label>
                <input  className='auth__input'
                placeholder='enter password'
                id='password'
                type='password'
                name='password'
                // value={form.password}
                onChange={ changeForm }
                 ></input>
                 <label>пароль</label>
                <br/>
                <button 
                className='auth__button btn-yellow'
                type='button'
                onClick={ loginHandler }
                >Войти</button>
                <button
                className='auth__button btn-green'
                type='button'
                onClick={ registerHandler }
                >Регистрация</button>
        </div>
    )
}

export default AuthPage;