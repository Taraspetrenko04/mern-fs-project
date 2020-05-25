import {useCallback} from 'react'


export const useMessage = () => {
    return useCallback( (error) => {
        if(error){
            alert(error);
        }
    }, [])

}
