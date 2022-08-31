import * as React from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import { ActivityIndicator, TextInput } from 'react-native-paper';
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

function PopolModal({setPopolModal, stklist, strategy, navigation}){

    const [balance, setBalance] = useState(15000);
    const [kakaoid, setKakaoid] = useState();
    const [quantity, setquantity] = useState();
    const [uuid, setUuid] = useState(-1);
    const [numberEntered, setNumberEntered] = useState(false);
    const [gotoBalacne, setGotoBalance] = useState(false);
    

    const [alertModal, setAlertModal] = useState(false);
    const [alertmessage, setAlertmessage] = useState();
    const [alertheader, setAlertheader] = useState();
    const [loadingPrice, setLoadingPrice] = useState(true);
    const [loadingQuantity, setLoadingQuantity] = useState(true);

    let [MaxStockPrice, setMaxStockPrice] = useState();

    useEffect(()=>{
        

        AsyncStorage.getItem('uuid', (err,result)=>{
            setUuid(result);
        })

        AsyncStorage.getItem('kakaoid', (err,result)=>{
            setKakaoid(result);
        })

       

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({    
                code: stklist       
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            let max = 0;
            for(let num of data){
                if(num > max) max = num;
            }                          
            setMaxStockPrice(max);
        }).then(data =>{
            setLoadingPrice(false);
            console.log('MaxStockPrice 계산 성공')
        }).catch(err =>{
            console.log('MaxStockPrice 계산 실패');
            console.log('-----에러내용-----');
            console.log(err);
        });

    },[])

    useEffect(()=>{
        if(uuid !== -1){
            fetch('http://haniumproject.com:8000/getUserAccount',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'uuid' : uuid
                }
            })
            .then( response => response.json())
            .then( data => {
                setBalance(data.quantity);
            }).then(data =>{
                setLoadingQuantity(false);
                console.log('잔고 불러오기 성공')
            }).catch(err =>{
                console.log('잔고 불러오기 실패');
                console.log('-----에러내용-----');
                console.log(err);
            });
        }
    },[uuid])

    

    function CloseModalHandler(){
        setPopolModal(false);
    }

    function PopolCompleteHandler(){
        console.log('------전송데이터 확인용------')
        console.log(`Max주식가격 : ${MaxStockPrice}`);
        console.log(`장바구니 주식코드 : ${stklist}`);
        console.log(`카카오ID : ${kakaoid}`);
        console.log(`잔고: ${quantity}`);
        console.log(`전략: ${strategy}`);


        console.log(
            JSON.stringify({
                'kakaoid' : kakaoid,
                'strategy' : strategy,
                'stklist' : stklist,
                'quantity' : quantity
            })
        )

        if(quantity > balance * 0.85){
            setAlertmessage('잔고의 85% 이하로 입력하세요');
            setAlertheader('error!')
            setAlertModal(true);
            return
        }else if(quantity < MaxStockPrice * 100){
            setAlertmessage(`${MaxStockPrice * 100}원 이상 입력하세요`);
            setAlertheader('error!')
            setAlertModal(true);
            return
        }else{
            PopolFetch();
        }
    }

    async function PopolFetch(){
        

        const done = await fetch('http://54.219.85.46:8000/submituserInfo',{
            method: 'POST',
            headers:{
                'Content-type' : 'application.json',
                'kakaoid' : kakaoid,
                'strategy' : strategy,
                'stklist' : stklist.toString(),
                'quantity' : quantity
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err =>{
            console.log('포트폴리오 서버 제출 실패');
            console.log('-----에러내용-----');
            console.log(err);
            return;
        });

        setAlertmessage('투자에 성공했습니다');
        setAlertheader('success!');
        setAlertModal(true);
        setGotoBalance(true);

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
            {loadingPrice | loadingQuantity ?
            <ActivityIndicator style={{
                position:'absolute',
                top: 50,
                bottom: 50,
                right: 50,
                left: 50
                }} size='small' color='black'>
            </ActivityIndicator>
            
            :
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
            }



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

            <AlertModal alertmessage={alertmessage} alertheader={alertheader} setAlertModal={setAlertModal} navigation={gotoBalacne ? navigation : null}/>
        </>
        :
        <></>

        }

    </>
    )
}

export default PopolModal;