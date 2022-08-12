import * as React from 'react';
import {useEffect, useState} from 'react';
import{Text,View, TouchableOpacity} from 'react-native';
import Header from '../component/layout/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';




function Homepage({setLogin}){
    let [uuid, Setuuid] = useState(-1);
    AsyncStorage.getItem('uuid', (err,result) =>{
        Setuuid(result);
    })

    useEffect(()=>{
        console.log(uuid);
    },[uuid])

    return(
        <>
            <Header setLogin={setLogin} pageName={'홈'}/>
        </>
    )
}

export default Homepage;