import * as React from 'react';
import{Text,View,TouchableOpacity, Touchable} from 'react-native';


function Signinpage({navigation}){

    

    function toSignupHandler(){
        navigation.navigate('Signuppage');
    }

    return(
        <View>
            <TouchableOpacity onPress={toSignupHandler}>
                <Text>
                    회원가입
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signinpage;