import * as React from 'react';
import {useEffect, useState} from 'react';
import{Text,View, TouchableOpacity,ScrollView} from 'react-native';
import Header from '../component/layout/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeChart from '../component/HomeElement/HomeChart';
import EnjoyChart from '../component/HomeElement/EnjoySearch';




function Homepage({setLogin}){
    let [uuid, Setuuid] = useState(-1);

    AsyncStorage.getItem('uuid', (err,result) =>{
        Setuuid(result);
    })

    
    return(
        <ScrollView contentContainerStyle={{flexGrow:1, flexDirection:'column', backgroundColor: 'white'}}>
            <Header setLogin={setLogin} pageName={'홈'}/>
            
            <HomeChart contentContainerStyle={{flex:1}}/>
            <EnjoyChart contentContainerStyle={{flex:1}}/>
        </ScrollView>
    )
}

export default Homepage;