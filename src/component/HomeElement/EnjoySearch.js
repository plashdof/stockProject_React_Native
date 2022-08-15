import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles=StyleSheet.create({

    EnjoySearchBox:{
        flex:1,    
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30
    },
    EnjoySearchTable:{
        flex:1,
        backgroundColor: 'white',  
        borderRadius: 8,   
        marginTop: 10
    },
    elevation:{
        shadowColor: '#52006A',  
        elevation: 20, 
    },
    EnjoySearchRow:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        height: 35
    },
    EnjoySearchText:{
        color: 'black'
    }
})

function EnjoyChart(){

    let [tostr, setTostr] = useState([]);
    let [tostrPrice, settostrPrice] = useState([]);
    let [uuid, Setuuid] = useState(-1);

    AsyncStorage.getItem('uuid', (err,result) =>{
        Setuuid(result);
    })


    useEffect(()=>{
        if(uuid !== -1){
            
            console.log(uuid);
            setTostr(['삼성전자', '삼성전자우', 'LG에너지솔루션'])
            fetch('http://haniumproject.com/getUserAccount',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'uuid' : uuid
                }
            })
            .then( response => response.json())
            .then( data => {
                console.log(data)
                setTostr(data.favlist.split(",").slice(0,3));
                AsyncStorage.setItem('balance', data.quantity);
                console.log('즐겨찾기 불러오기 성공');
            });
        }
        
    },[uuid])

    useEffect(()=>{
        
        if(tostr.length !== 0){

            
            console.log('가격 불러오기 시작');

            fetch('http://54.215.210.171:8000/getPreview',{
                method: 'POST',
                body:JSON.stringify({
                    code: tostr.slice(undefined,3)
                }),
                headers:{
                    'Content-Type' : './application.json'
                }
            }).then( response => response.json())
            .then( data => {
                settostrPrice(data);
                console.log('즐겨찾기 가격들 불러오기 성공');
            })
        }
    },[tostr])


    return(
        
    <View style={styles.EnjoySearchBox}>
        <Text>즐겨찾기</Text>

        <View style={[styles.EnjoySearchTable, styles.elevation]}>
            <View style={[styles.EnjoySearchRow, {backgroundColor: '#9F9989'}]}>
                <Text style={[styles.EnjoySearchText,{marginLeft: 30, fontWeight:'bold'}]}>종목명</Text>
                <Text style={[styles.EnjoySearchText,{marginRight: 30, fontWeight: 'bold'}]}>가격</Text>
            </View>


            {tostr.map((item, idx)=>{

                return(
                    <View style={styles.EnjoySearchRow}>
                        <Text style={[styles.EnjoySearchText,{marginLeft: 30}]}>{item}</Text>
                        <Text style={[styles.EnjoySearchText,{marginRight: 30}]}>{tostrPrice[idx]}</Text>
                    </View>
                )
            })}
        </View>
        
    </View>
    )
}

export default EnjoyChart