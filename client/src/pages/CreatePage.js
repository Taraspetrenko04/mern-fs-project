import React, { useState, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/Auth.context';
import { useHistory } from 'react-router-dom';


export const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink ] = useState('');

    
    const onKeyHandler = async (event) => {
        if(event.key === 'Enter'){
            try {
                const data = await request('api/link/generate', 'POST', { from: link },
                 { Authorization: `Bearer ${auth.token}` } )
                console.log(data);
                history.push(`/detail/${data.link._id}`);
            } catch (error) {
                
            }
        }
    }
    return(
            <div className='auth'>
                <h2 className="auth__title">Введите ссылку</h2>
                <input className='auth__input'
                placeholder='insert the link'
                id='link'
                type='text'
                name='link'
                value={link}
                onChange={ (e) => setLink(e.target.value) }
                onKeyPress={ onKeyHandler }
                ></input>
                <br />
                <label>insert link and press ENTER</label>
        </div>
    )
}

export default CreatePage;