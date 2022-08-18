import * as React from 'react';
import SearchBar from './SearchBar';
import {View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';

import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fillstar from '../../assets/Searchpageimg/filledStar.png';
import Emptystar from '../../assets/Searchpageimg/emptyStar.png';


const styles=StyleSheet.create({
    searchStocklist:{
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        zIndex: 0

    },
    searchStockname:{
        marginTop: 13,
        marginLeft: 20
    },
    searchStockprice:{
        marginTop: 13,
        marginRight: 20
    },
    enjoybtn:{
        width: 20,
        height: 20,
        marginTop: 13,
        marginRight: 15
    }
})

function SearchLayout({gotoChart}){

    let [searchresultStockList, setSearchresultStockList] = useState([]);       //  주식이름 리스트
    let [searchresultPriceList, setSearchresultPriceList] = useState([]);       //  주식가격 리스트
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



    //  서버에 검색리스트 보내서, 가격리스트 받아오기. searchresultPriceList에 저장
    useEffect(()=>{
        
        setpriceisLoading(true);

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({    
                code: searchresultStockList        
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            setSearchresultPriceList(data);                                 
            setpriceisLoading(false);
        })

    },[searchresultStockList])



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

    // 검색리스트 클릭시, 해당 주식의 차트페이지로 이동
    
    function PressStockList(item){
        gotoChart();
    }

    
    

    return(
        <View>
            <SearchBar setSearchResult={setSearchresultStockList}/>
            

            {   searchresultStockList.map((item, idx)=>{
                return(
                    <TouchableOpacity style={styles.searchStocklist} onPress={()=>{PressStockList(item)}}>

                        
                        <Text style={styles.searchStockname}>{item}</Text>
                        
                        <View style={{flexDirection:'row'}}>

                            {
                                priceisLoading ?
                                <ActivityIndicator style={{marginRight: 20}}></ActivityIndicator>
                                :
                                <Text style={styles.searchStockprice}>{searchresultPriceList[idx]}</Text>

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

            
            
        
        </View>
    )
}

export default SearchLayout;