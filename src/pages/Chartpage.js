import * as React from 'react';
import{Text,View} from 'react-native';
import Header from '../component/layout/Header';

function Chartpage({setLogin}){
    return(
        <>  
            <Header setLogin={setLogin} pageName={'차트'}/>

   
        </>
    )
}

export default Chartpage;