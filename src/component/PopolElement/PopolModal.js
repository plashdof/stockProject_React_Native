import * as React from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import AlertModal from './AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles=StyleSheet.create({
    ModalBox:{
        position: 'absolute',
        height: 170,
        left: 50,
        right: 50,
        marginTop: 120,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 5,
        elevation: 5
    },
    ModalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E7E7E7',
        height: 40,
        paddingHorizontal: 10
    },
    ModalMain:{
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    HeaderText:{textAlign:'center', color: 'black', fontSize: 13, fontWeight: 'bold', marginTop: 10},
    MainText:{
        color:'black',
        marginTop: 10
    },
    popolbtn:{
        position: 'relative',
        width: 70,
        height: 20,
        left: 70,
        top: 20,
        borderRadius: 3
    }

})

function PopolModal({setPopolModal, sktlist, strategy, navigation}){

    const [balance, setBalance] = useState(15000);
    const [kakaoid, setKakaoid] = useState();
    const [quantity, setquantity] = useState();

    const [numberEntered, setNumberEntered] = useState(false);
    

    const [alertModal, setAlertModal] = useState(false);
    const [alertmessage, setAlertmessage] = useState();
    const [alertheader, setAlertheader] = useState();
    

    let [MaxStockPrice, setMaxStockPrice] = useState();

    useEffect(()=>{

        // AsyncStorage.getItem('balance',(err, result)=>{
        //     setBalance(result);
        // })

        AsyncStorage.getItem('kakaoid', (err,result)=>{
            setKakaoid(result);
        })

    },[])

    

    function CloseModalHandler(){
        setPopolModal(false);
    }

    function PopolCompleteHandler(){
        if(quantity > balance * 0.85){
            setAlertmessage('금액이 너무 높습니다');
            setAlertheader('error!')
            setAlertModal(true);
            return
        }
        else if(quantity < MaxStockPrice * 100){
            setAlertmessage('금액이 너무 낮습니다');
            setAlertheader('error!')
            setAlertModal(true);
            return
        } else{
            PopolFetch();
        }
    }

    async function PopolFetch(){

        const done = await fetch('https://asdf-be016-default-rtdb.firebaseio.com/.json',{
            method: 'POST',
            body: JSON.stringify({
                'kakaoid' : kakaoid,
                'strategy' : strategy,
                'stklist' : sktlist,
                'quantity' : quantity
            }),
            headers:{
                'Content-type' : 'application.json'
            }
        })

        setAlertmessage('투자에 성공했습니다');
        setAlertheader('success!');
        setAlertModal(true);

    }

    function EnterHandler(e){
        setNumberEntered(true);
        setquantity(e);

        if(e.length === 0){
            setNumberEntered(false);
        }
    }

    return(<>

        <View style={styles.ModalBox}>
            <View style={styles.ModalHeader}>
                <Text style={{color: '#E7E7E7'}}>X</Text>
                <Text style={styles.HeaderText}>운용 금액 설정</Text>
                <TouchableOpacity onPress={CloseModalHandler}>
                    <Text style={{marginTop: 10}}>X</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.ModalMain}>
                <Text style={styles.MainText}>잔고금액 : {balance}</Text>

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.MainText}>설정금액 : </Text>
                    <TextInput style={{height: 20, width: 100, marginTop: 5}} onChangeText={(newText)=>{EnterHandler(newText)}}/>
                </View>

                {numberEntered ?
                <TouchableOpacity style={[styles.popolbtn,{backgroundColor: '#2F2D2B'}]} onPress={PopolCompleteHandler}>
                    <Text style={{color: 'white', textAlign: 'center'}}>설정완료</Text>
                </TouchableOpacity>

                :

                <View style={[styles.popolbtn, {backgroundColor: '#B8B8B8'}]} >
                    <Text style={{color: 'white', textAlign: 'center'}}>설정완료</Text>
                </View>
                }
                
            </View>
        </View>

        {alertModal ?
        <>
            <View style={{
                position:'absolute', 
                backgroundColor: 'rgba(0,0,0,0.5)',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
                }}>
            </View>

            <AlertModal alertmessage={alertmessage} alertheader={alertheader} setAlertModal={setAlertModal} navigation={navigation}/>
        </>
        :
        <></>

        }

    </>
    )
}

export default PopolModal;