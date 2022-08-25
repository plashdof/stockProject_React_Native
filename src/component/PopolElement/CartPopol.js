import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Touchable} from 'react-native';
import {useEffect, useState} from 'react';
import SearchBar from '../SearchElement/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fillstar from '../../assets/Searchpageimg/filledStar.png';
import Emptystar from '../../assets/Searchpageimg/emptyStar.png';


const styles=StyleSheet.create({
    StockList:{
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        zIndex: 0,
        backgroundColor: '#F5F5F5',
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 8

    },
    StockName:{
        marginTop: 13,
        marginLeft: 20,
        color: 'black'
    },
    StockPrice:{
        marginTop: 13,
        marginRight: 20,
        color: 'black'
    },
    enjoybtn:{
        width: 20,
        height: 20,
        marginTop: 13,
        marginRight: 15
    },
    CartHeader:{
        marginHorizontal: 20,
        marginVertical: 20,
        color: 'black',
        backgroundColor: '#B1BEBC',
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 8
    },
    CartList:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        zIndex: 0,
        backgroundColor: '#F5F5F5',
        marginTop: 5,
        marginHorizontal: 40,
        borderRadius: 8
    },
    Submitbtn:{
        marginHorizontal: 130,
        marginVertical: 20,
        backgroundColor: '#303030',
        borderRadius: 8,
        paddingVertical: 5,
    }
})

function CartPopol({setSelectedPopol, setSubmitData, submitData}){

    let [StockList, setStockList] = useState(['삼성전자', 'LG에너지솔루션', 'SK하이닉스', '삼성바이오로직스', '삼성전자우', 'LG화학', 'NAVER', '현대차', '삼성SDI', '기아']);       //  주식이름 리스트
    let [PriceList, setPriceList] = useState([]);       //  주식가격 리스트
    let [CartList, setCartList] = useState([]);


    let [tostr, setTostr] = useState([]);                                       //  즐겨찾기 목록 데이터
    let [priceisLoading, setpriceisLoading] = useState(false);                  
    let [afterFirstFetch, setafterFirstFetch] = useState(false);                   

    let [uuid, setUuid] = useState(-1);


    AsyncStorage.getItem('uuid', (err,result)=>{
        setUuid(result);
    })


    // 서버로부터 FavList 받아오기. tostr에 저장
    useEffect(()=>{
        if(uuid !== -1){

            fetch(`http://haniumproject.com/getUserAccount`,{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'uuid' : uuid
                }
            })
            .then( response => response.json())
            .then( data => {
                console.log(data)
                setTostr(data.favlist.split(","));
                console.log('즐겨찾기 불러오기 완료');
                setafterFirstFetch(true);
                setTemp(true);
            });

        }
        
    },[uuid])



    //  서버에 검색리스트 보내서, 가격리스트 받아오기. PriceList에 저장
    useEffect(()=>{
        
        setpriceisLoading(true);

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({    
                code: StockList        
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            setPriceList(data);                                 
            setpriceisLoading(false);
        })

    },[StockList])



    //  즐겨찾기 목록 변동시 (별버튼 클릭), 변경목록 서버에 POST

    useEffect(()=>{

        if(afterFirstFetch){
            fetch(`http://haniumproject.com/setUserFavList`,{
                method: 'POST',
                body:JSON.stringify({
                    'target' : tostr.toString()
                }),
                headers:{
                    'Content-Type' : 'application/json',
                    'uuid' : uuid
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);                      //  code : 1 반환시 성공
                console.log("즐겨찾기 변경 완료");
            });
        }
        

    },[tostr]);


    // 주식이름이 즐겨찾기목록에 있는지 검사 

    function InEnjoyList(item){

        for(let i = 0; i < tostr.length; i++){
            if(tostr[i] === item){
                return true;
            }
        }

        return false;
    }


    //  즐겨찾기 버튼 눌렀을때, tostr 변경 (추가, 제거)

    function EnjoyClick(item){
        if(!tostr.includes(item)){
            setTostr([item, ...tostr])
        }
        else{
            setTostr(tostr.filter(x=>x !== item))
        }
    }

    function PressStockList(item){
        if(!CartList.includes(item)){
            setCartList([...CartList, item]);
        }
    }

    function removeCartHandler(item){
        setCartList(CartList.filter(x => x !== item));
    }

    function GobackHandler(){
        setSelectedPopol(false);
    }

    function openModal(){
        setSubmitData({strategy : submitData, stocklist: CartList})
        console.log(submitData);
    }

    return(<>

        <SearchBar setSearchResult={setStockList}/>

        { StockList.map((item, idx)=>{
                return(
                    <TouchableOpacity style={styles.StockList} onPress={()=>{PressStockList(item)}}>

                        
                        <Text style={styles.StockName}>{item}</Text>
                        
                        <View style={{flexDirection:'row'}}>

                            {
                                priceisLoading ?
                                <ActivityIndicator style={{marginRight: 20}}></ActivityIndicator>
                                :
                                <Text style={styles.StockPrice}>{PriceList[idx]}</Text>

                            }
                            
                            {
                                InEnjoyList(item) === true ?
                                <TouchableOpacity onPress={()=>{EnjoyClick(item)}}>
                                    <Image source={Fillstar} style={styles.enjoybtn}/>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={()=>{EnjoyClick(item)}}>
                                    <Image source={Emptystar} style={styles.enjoybtn}/>
                                </TouchableOpacity>
                            }
                            
                        </View>
                        
                    
                    </TouchableOpacity>
                )
            })
        }

        <Text style={styles.CartHeader}>장바구니</Text>

        {
            CartList.map((item)=>{
                return(
                    <TouchableOpacity style={styles.CartList}>
                        <Text style={styles.StockName}>{item}</Text>
                        <TouchableOpacity style={{marginTop: 10, marginRight: 10}} onPress={()=>{removeCartHandler(item)}}>
                            <Text style={{fontSize: 20}}>x</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            })
        }

        <TouchableOpacity style={styles.Submitbtn} onPress={openModal}>
            <Text style={{textAlign: 'center', color: 'white'}}>선택완료</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={GobackHandler} style={{marginTop: 50}}>
            <Text>뒤로가기</Text>
        </TouchableOpacity>
    
    </>
    )
}

export default CartPopol