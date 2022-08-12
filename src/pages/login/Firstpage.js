import * as React from 'react';
import {useState, useEffect} from 'react';
import{StyleSheet, View,TouchableOpacity, Image} from 'react-native';

import {getProfile, login} from '@react-native-seoul/kakao-login'
import kakaoIcon from '../../assets/img/kakaoIcon.png'
import chartIcon from '../../assets/img/loginChart.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
/* 로그인 성공시 반환값 */

// accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scopes

const styles = StyleSheet.create({

    loginBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1976D2'
    },

    ChartIcon:{
        width: 100,
        height: 100,
        marginBottom: 150
        
    },
})

function Firstpage({navigation, setLogin}){
    const [token, setToken] = useState(-1);

    async function SignwithKakao(){
        try{
            const result = await login();       // 핸드폰에 카카오톡 어플 설치되어있다면, 카카오톡으로 이동.
                                                //  아니라면 loginWithKakaoAccount 호출 (카카오 계정으로 로그인)
            console.log(result);    
    
            setToken(result.accessToken);
        } catch(err){
            console.error(err)
        } 
        
    }

    useEffect(()=>{

        if(token !== -1){
            console.log(token)

            fetch('http://haniumproject.com/auth',{
                method: 'POST',
                body:JSON.stringify({
                    code: token
                }),
                headers:{
                    'Content-Type' : 'application/json'
                }
            }).then(response => response.json())
            .then(data => {
                // TODO : 서버로 Token을 주게되면, 반환값을 받는다.
                // 이미회원이면 home으로, 회원이 아니면 Signuppage로 가게하기!
                console.log(data.uuid);
                AsyncStorage.setItem('uuid', data.uuid)
                AsyncStorage.setItem('name', data.name)

                if(data.registration === 0){
                    setLogin(true);
                } else if(data.registration === 1){
                    navigation.navigate('Signuppage');
                }
                
                
            }).catch()
        }
    },[token])


    return(
        <View style={styles.loginBox}>
            <Image source={chartIcon} style={styles.ChartIcon} />
            <TouchableOpacity title="로그인" onPress={()=>SignwithKakao()} style={styles.KakaoIcon}>
                <Image source={kakaoIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default Firstpage;