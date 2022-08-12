import * as React from 'react';
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
    },

    PageName:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20
    },

    BtnName:{
        textAlign:'center',
    },

    dummy:{
        color: 'white'
    }
})


function Header({setLogin, pageName}){

    
    async function logoutHandler(){

        try{
            const done = await unlink();
            console.log(done);
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