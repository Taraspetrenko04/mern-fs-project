import React from 'react';
import './style.scss';

const LinkCard = ({ link }) => {
    return(
        <div className='card__wrapper'>
        <h2>Сcылка</h2>
        <p>Ваша ссылка: <a href={link.to} target='_blanc' rel='noopener noreferrer'>{link.to}</a></p>
        <p>Откуда: <a href={link.from} target='_blanc' rel='noopener noreferrer'>{link.from}</a></p>
        <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
        <p>Дата создания: <strong>{ new Date(link.date).toLocaleDateString()}</strong></p>
    </div>
    )
}

export default LinkCard;
