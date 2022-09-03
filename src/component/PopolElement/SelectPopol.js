import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';




const styles=StyleSheet.create({
    header:{
        textAlign: 'center',
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    popolbtn:{
        marginHorizontal: 50,
        marginVertical: 25,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#F1F1F1'
    },
    elevation:{
        elevation: 15
    },
    btnHeader:{
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        marginBottom: 15
    },
    btnView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    btnText:{
        marginHorizontal: 10,
        marginVertical: 3
    },
    submitbtn:{
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#303030',
        marginHorizontal: 50,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 50
    },
})

function SelectPopol({setSelectedPopol, setStrategy, setErrorModal, setErrormessage, setErrorheader}){

    let [uuid, Setuuid] = useState(-1);
    let [clickedbtn, setClickedbtn] = useState(-1);

    let [popolList, setPopolList] = useState([{
        name: '전략',
        er: 5,
        sharpe: 10
    }]);

    useEffect(()=>{
        AsyncStorage.getItem('uuid', (err,result) =>{
            Setuuid(result);
        })
    },[])
    

    
    useEffect(()=>{
        if(uuid !== -1){
            fetch('http://haniumproject.com:8000/getModelInfo',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${uuid}`
                }
            })
            .then(response=> response.json())
            .then(data => {
                setPopolList(data);
                console.log('전략데이터 불러오기 성공');
            }).catch(err =>{
                console.log('전략데이터 불러오기 실패');
                console.log('-----에러내용-----');
                console.log(err);
            });
        }
        
    },[uuid])


    function SubmitHandler(){
        if(clickedbtn === -1){
            setErrormessage('전략을 선택하세요');
            setErrorheader('error!');
            setErrorModal(true);
            return;
        }
        setStrategy(popolList[clickedbtn].filename);
        setSelectedPopol(true);
    }

    function PopolbtnHandler(idx){
        setClickedbtn(idx);
    }

    return(<View>

        <Text style={styles.header}>사용할 전략을 선택하세요</Text>

        {popolList.map((item, idx)=>{
            return(
                <TouchableOpacity style={[styles.popolbtn, styles.elevation,{
                    backgroundColor : clickedbtn===idx ? '#b39b9a' : '#F1F1F1'}]} 
                    onPress={()=>{PopolbtnHandler(idx)}}>
                    
                    <Text style={styles.btnHeader}>전략 {idx+1}</Text>
                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>Name</Text>
                        <Text style={styles.btnText}>{item.name}</Text>
                    </View>
                    
                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>ER</Text>
                        <Text style={styles.btnText}>{item.er}</Text>
                    </View>

                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>Sharpe</Text>
                        <Text style={styles.btnText}>{item.sharpe}</Text>
                    </View>
                    
                    
                </TouchableOpacity>
            )
        })}


        <TouchableOpacity style={styles.submitbtn} onPress={SubmitHandler} >
            <Text style={{color: 'white'}}>다음 단계로</Text>
        </TouchableOpacity>


    </View>
    )
}

export default SelectPopol