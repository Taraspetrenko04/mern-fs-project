import React, { useState, useCallback, useContext, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'; 
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/Auth.context';
import Loader from '../components/Loader/Loader';
import LinkCard from '../components/LinkCard/LinkCard';


export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [ link, setLink ] = useState(null);
    const linkId = useParams().id


    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                 Authorization: `Bearer ${token}`
            })


            setLink(fetched);

        } catch (error) {}
     }, [token, linkId, request])
     
     
     useEffect( () => {
        getLink()
    }, [getLink])


    if( loading ){
        return <Loader />
    }
    return(
        <Fragment>
            { !loading && link &&  <LinkCard link={ link } />}
        </Fragment>
    )
}

export default DetailPage;