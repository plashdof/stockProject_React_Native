import * as React from 'react';
import{Text,View, TouchableOpacity} from 'react-native';

function Signuppage({setLogin}){

    function CompleteSignupHandler(){
        setLogin(true);
    }


    return(
        <View>
            <TouchableOpacity onPress={CompleteSignupHandler}>
                <Text> 완료 </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signuppage;