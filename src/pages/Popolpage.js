import * as React from 'react';
import{Text,View} from 'react-native';
import Header from '../component/layout/Header';

function Popolpage({setLogin}){
    return(
        <>  
            <Header setLogin={setLogin} pageName={'포트폴리오'}/>

   
        </>
    )
}

export default Popolpage;