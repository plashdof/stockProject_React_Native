import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {unlink} from '@react-native-seoul/kakao-login';


const styles=StyleSheet.create({
    headerBox:{
        flexWrap: 'wrap',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        height: 60,
        borderBottomColor: '#BABABA',
        borderWidth: 1
    },

    PageName:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20
    },

    BtnName:{
        textAlign:'center',
        fontSize: 10
    },

    dummy:{
        color: 'white'
    }
})


function Header({setLogin, pageName}){

    async function logoutHandler(){

        try{
            const done = await unlink();            // 로그아웃시, 카카오계정 연걸 끊기
            console.log(done);
            const clear = await AsyncStorage.clear();   // 로그아웃시, local에 저장되어있던 정보들 모두 삭제
            console.log(clear);
        } catch(err){}

        setLogin(false);
    }

    return(
        <View style={styles.headerBox}>
            <Text style={styles.dummy}>더미더미</Text>
            <Text style={styles.PageName}>{pageName}</Text>

            <TouchableOpacity onPress={logoutHandler}>
                <Text style={styles.BtnName}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header;