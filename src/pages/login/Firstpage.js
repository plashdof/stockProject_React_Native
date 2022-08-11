import * as React from 'react';
import {useState} from 'react';
import{Text,View,TouchableOpacity, Touchable, Alert} from 'react-native';


function Firstpage({setLogin, navigation}){

    const [kakaosuccess, Setkakaosuccess] = useState(true);

    function SignwithKakao(){
        if(kakaosuccess){
            setLogin(true);
        }
    }

    return(
        <View>
            <TouchableOpacity title="로그인" onPress={()=>SignwithKakao()}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Firstpage;