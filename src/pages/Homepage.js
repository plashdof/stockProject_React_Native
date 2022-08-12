import * as React from 'react';
import{Text,View, TouchableOpacity} from 'react-native';
import Header from '../component/layout/Header';


function Homepage({setLogin}){
    

    return(
        <>
            <Header setLogin={setLogin} pageName={'홈'}/>
        </>
    )
}

export default Homepage;