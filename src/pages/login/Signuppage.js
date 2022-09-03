import * as React from 'react';
import{Text,View, TouchableOpacity, StyleSheet,Image, TextInput, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react'
import chartIcon from '../../assets/img/signupChart.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles=StyleSheet.create({


    signupBox:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },

    header2:{
        width:350,
        height:30,
        backgroundColor: '#2F2D2B',
        marginTop: 25
    },

    header2Text:{
        textAlign: 'center',
        color: 'white', 
        fontSize: 15,
        marginTop: 5
    },

    doneSignupbtn:{
        width:350,
        height:40,
        marginBottom: 10
    },

    doneSignupbtnText:{
        textAlign: 'center',
        color: 'white', 
        fontSize: 20,
        marginTop: 8
    },

    InputName:{
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20
    },

    InputBox:{
        borderColor: 'black'
    }
})


function Signuppage({setLogin}){

    let [uuid, Setuuid] = useState(-1);
    let [name, Setname] = useState(-1);

    const [apikey, setApikey] = useState();
    const [secret, setSecret] = useState();
    const [cano, setCano] = useState();
    const [acnt, setAcnt] = useState();
    const [quantity, setQuantity] = useState();

    let [isSignupLoading, setisSignupLoading] = useState(false);


    AsyncStorage.getItem('uuid', (err,result) =>{
        Setuuid(result);
    })

    AsyncStorage.getItem('name', (err, result)=>{
        Setname(result);
    })

    function onChangeApikey(text){
        setApikey(text);
    }
    function onChangeSecret(text){
        setSecret(text);
    }
    function onChangeCano(text){
        setCano(text);
    }
    function onChangeAcnt(text){
        setAcnt(text);
    }
    function onChangeQuantity(text){
        setQuantity(text);
    }


    /* 테스트용 firebase로 데이터 전송 */

    async function CompleteSignupHandler(){

        if(!apikey || !apikey.trim()){
            return Alert.alert('알림', 'apikey를 입력하세요')
        }
        if(!secret || !secret.trim()){
            return Alert.alert('알림', 'secret을 입력하세요')
        }
        if(!cano || !cano.trim()){
            return Alert.alert('알림', '계좌 앞 8자리를 입력하세요')
        }
        if(!acnt || !acnt.trim()){
            return Alert.alert('알림', '계좌 뒤 2자리를 입력하세요')
        }
        if(!quantity || !quantity.trim()){
            return Alert.alert('알림', '잔고를 입력하세요')
        }


        setisSignupLoading(true);

        const done1 = await fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body:JSON.stringify({
                'target' : apikey
            }),
            headers:{
                'Content-Type': 'application/json',
                'uuid' : uuid,
                'Authorization' : 'Bearer uuid'
            }
        })

        const done2 = await fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body:JSON.stringify({
                'target' : secret
            }),
            headers:{
                'Content-Type': 'application/json',
                'uuid' : uuid,
                'Authorization' : 'Bearer uuid'
            }
        })

        const done3 = await fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body:JSON.stringify({
                'target' : cano
            }),
            headers:{
                'Content-Type': 'https://stock-a95d6-default-rtdb.firebaseio.com/.json',
                'uuid' : uuid,
                'Authorization' : 'Bearer uuid'
            }
        })

        const done4 = await fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body:JSON.stringify({
                'target' : acnt
            }),
            headers:{
                'Content-Type': 'application/json',
                'uuid' : uuid,
                'Authorization' : 'Bearer uuid'
            }
        })

        const done5 = await fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body:JSON.stringify({
                'target' : quantity
            }),
            headers:{
                'Content-Type': 'application/json',
                'uuid' : uuid,
                'Authorization' : 'Bearer uuid'
            }
        }).then(response => response.json())
        .then((data)=>{
            Alert.alert('알림', '회원가입이 완료되었습니다')
            setLogin(true);
            console.log('회원가입 성공');
        }).catch(err =>{
            console.log('회원가입 실패');
            console.log('-----에러내용-----');
            console.log(err);
        });
    }


    /* 실서버로 데이터 보내면 에러. 주석처리 */

    // async function CompleteSignupHandler(){

    //     if(!apikey || !apikey.trim()){
    //         return Alert.alert('알림', 'apikey를 입력하세요')
    //     }
    //     if(!secret || !secret.trim()){
    //         return Alert.alert('알림', 'secret을 입력하세요')
    //     }
    //     if(!cano || !cano.trim()){
    //         return Alert.alert('알림', '계좌 앞 8자리를 입력하세요')
    //     }
    //     if(!acnt || !acnt.trim()){
    //         return Alert.alert('알림', '계좌 뒤 2자리를 입력하세요')
    //     }
    //     if(!quantity || !quantity.trim()){
    //         return Alert.alert('알림', '잔고를 입력하세요')
    //     }
            

    //     setisSignupLoading(true);

    //     const done1 = await fetch('http://haniumproject.com/setUserApiKey',{
    //         method: 'POST',
    //         body:JSON.stringify({
    //             'target' : apikey
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'uuid' : uuid
    //         }
    //     })

    //     const done2 = await fetch('http://haniumproject.com/setUserSecret',{
    //         method: 'POST',
    //         body:JSON.stringify({
    //             'target' : secret
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'uuid' : uuid
    //         }
    //     })

    //     const done3 = await fetch('http://haniumproject.com/setUserCANO',{
    //         method: 'POST',
    //         body:JSON.stringify({
    //             'target' : cano
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'uuid' : uuid
    //         }
    //     })

    //     const done4 = await fetch('http://haniumproject.com/setUserACNT',{
    //         method: 'POST',
    //         body:JSON.stringify({
    //             'target' : acnt
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'uuid' : uuid
    //         }
    //     })

    //     const done5 = await fetch('http://haniumproject.com/setUserQuantity',{
    //         method: 'POST',
    //         body:JSON.stringify({
    //             'target' : quantity
    //         }),
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'uuid' : uuid
    //         }
    //     }).then(response => response.json())
    //     .then((data)=>{
    //         console.log(data);
    //         Alert.alert('알림', '회원가입이 완료되었습니다')
    //         setLogin(true);
    //     })
    // }


    return(<>
        {isSignupLoading ? 
        <>
            <View style={styles.signupBox}>

                <ScrollView>
                    <View style={styles.header}> 
                        <Image source={chartIcon} style={{width: 40, height: 40}}></Image>
                        <Text style={{fontSize:25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginTop:10}}>회원가입</Text>
                    </View>

                    <View style={styles.header2}>
                        <Text style={styles.header2Text}>한국투자증권 정보</Text>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> 닉네임 </Text>
                        <Text>{name}</Text>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> API KEY </Text>
                        <TextInput/>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> SECRET </Text>
                        <TextInput/>
                    </View>

                    <View style={styles.header2}>
                        <Text style={styles.header2Text}>계좌정보</Text>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> 앞 8자리 </Text>
                        <TextInput/>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> 뒤 2자리 </Text>
                        <TextInput/>
                    </View>

                    <View style={styles.InputWrapper}>
                        <Text style={styles.InputName}> 잔고량 </Text>
                        <TextInput/>
                    </View>
                </ScrollView>

                <View style={[styles.doneSignupbtn, {backgroundColor: '#2F2D2B'}]}>
                    <Text style={styles.doneSignupbtnText}> 가입하기 </Text>
                </View>
            
            </View>

            <View style={{
                position:'absolute', 
                backgroundColor: 'rgba(0,0,0,0.5)',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
                }}>
            </View>
        

            <ActivityIndicator style={{
                position:'absolute',
                top: 50,
                bottom: 50,
                right: 50,
                left: 50
                }} size='large' color='brown'>
            </ActivityIndicator>
        </>
        :

        <View style={styles.signupBox}>

            <ScrollView>
                <View style={styles.header}> 
                    <Image source={chartIcon} style={{width: 40, height: 40}}></Image>
                    <Text style={{fontSize:25, fontWeight: 'bold', color: 'black', marginLeft: 15, marginTop:10}}>회원가입</Text>
                </View>

                <View style={styles.header2}>
                    <Text style={styles.header2Text}>한국투자증권 정보</Text>
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> 닉네임 </Text>
                    <Text>{name}</Text>
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> API KEY </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="API KEY 번호를 입력하세요"
                        onChangeText={onChangeApikey}
                        value={apikey}
                    />
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> SECRET </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="SECRET 번호를 입력하세요"
                        onChangeText={onChangeSecret}
                        value={secret}
                        secureTextEntry
                    />
                </View>

                <View style={styles.header2}>
                    <Text style={styles.header2Text}>계좌정보</Text>
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> 앞 8자리 </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="계좌 앞 8자리를 입력하세요"
                        onChangeText={onChangeCano}
                        value={cano}
                        keyboardType='decimal-pad'
                    />
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> 뒤 2자리 </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="계좌 뒤 2자리를 입력하세요"
                        onChangeText={onChangeAcnt}
                        value={acnt}
                        keyboardType='decimal-pad'
                        secureTextEntry
                    />
                </View>

                <View style={styles.InputWrapper}>
                    <Text style={styles.InputName}> 잔고량 </Text>
                    <TextInput 
                        style={styles.InputBox}
                        placeholder="잔고량을 입력하세요"
                        onChangeText={onChangeQuantity}
                        keyboardType='decimal-pad'
                        value={quantity}
                    />
                </View>
            </ScrollView>


            { apikey && secret && cano && acnt && quantity ? 
                <TouchableOpacity onPress={CompleteSignupHandler} 
                    style={[styles.doneSignupbtn, {backgroundColor: '#2F2D2B'}]}
                >
                    <Text style={styles.doneSignupbtnText}> 가입하기 </Text>
                </TouchableOpacity>
                
                :    
                <View style={[styles.doneSignupbtn, {backgroundColor: '#D3D3D3'}]}>
                    <Text style={styles.doneSignupbtnText}> 가입하기 </Text>
                </View>
            }

        </View>
        }
    </>  
    )
}

export default Signuppage;