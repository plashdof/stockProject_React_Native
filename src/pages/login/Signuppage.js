import * as React from 'react';
import{Text,View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import chartIcon from '../../assets/img/signupChart.png';

const styles=StyleSheet.create({


    signupBox:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    header:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20
    },

    doneSignupbtn:{
        width:350,
        height:50,
        backgroundColor: '#2F2D2B'
    },

    doneSignupbtnText:{
        textAlign: 'center',
        color: 'white', 
        fontSize: 25,
        marginTop: 10
    }
})

function Signuppage({setLogin}){

    function CompleteSignupHandler(){
        setLogin(true);
    }


    return(
        <View style={styles.signupBox}>
            <View style={styles.header}> 
                <Image source={chartIcon} style={{width: 40, height: 40}}></Image>
                <Text style={{fontSize:25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginTop:10}}>회원가입</Text>
            </View>

            <TouchableOpacity onPress={CompleteSignupHandler} style={styles.doneSignupbtn}>
                <Text style={styles.doneSignupbtnText}> 가입하기 </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signuppage;