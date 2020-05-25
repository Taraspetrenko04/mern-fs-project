import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss'

const LinkList = ( {links} ) => {
    if( !links.length ){
        return(
            <div>No links</div>
        )
    }
    return(
        <table className="link__table">
            <thead>
                <tr>
                    <td>№</td>
                    <td>Оригинальная ссылка</td>
                    <td>Сокращенная ссылка</td>
                    <td>Открыть</td>
                </tr>
            </thead>
            <tbody>
                {links.map( (link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default LinkList;