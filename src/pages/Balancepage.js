import * as React from 'react';
import{Text,View} from 'react-native';
import Header from '../component/layout/Header';

function Balancepage({setLogin}){
    return(
        <>  
            <Header setLogin={setLogin} pageName={'잔고확인'}/>

   
        </>
    )
}

export default Balancepage;