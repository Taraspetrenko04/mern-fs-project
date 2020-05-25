import React, { useState, useContext, useCallback, useEffect, Fragment } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/Auth.context';
import Loader from '../components/Loader/Loader';
import LinkList from '../components/LinkList/LinkList';


export const LinkPage = () => {
    const [links, setLinks] = useState( [] );
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);


    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request ('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(fetched);


        } catch (error) {}
    }, [token, request]);


    useEffect( ()=> {
        fetchLinks()
    }, [fetchLinks])

    if ( loading ){
        return(
            <Loader />
        )
    }

    return(
        <Fragment>
            { !loading && <LinkList links={links} /> }
        </Fragment>
    )
}


export default LinkPage;