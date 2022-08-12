import * as React from 'react';
import{Text,View} from 'react-native';
import Header from '../component/layout/Header';

function Searchpage({setLogin}){
    return(
        <>  
            <Header setLogin={setLogin} pageName={'검색'}/>

   
        </>
    )
}

export default Searchpage;