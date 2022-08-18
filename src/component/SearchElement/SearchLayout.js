import * as React from 'react';
import SearchBar from './SearchBar';
import {View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';

import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fillstar from '../../assets/Searchpageimg/filledStar.png';
import Emptystar from '../../assets/Searchpageimg/emptyStar.png';


const styles=StyleSheet.create({
    searchStocklist:{
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,

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

function SearchLayout(){

    let [searchresultStockList, setSearchresultStockList] = useState([]);
    let [searchresultPriceList, setSearchresultPriceList] = useState(['123', '123', '354', '504', '4564']);
    let [tostr, setTostr] = useState(['삼성전자', '한화투자증권']);
    let [priceisLoading, setpriceisLoading] = useState(false);
    let [afterFirstFetch, setafterFirstFetch] = useState(false);

    let [uuid, setUuid] = useState();


    AsyncStorage.getItem('uuid', (err,result)=>{
        setUuid(result);
    })
    

    useEffect(()=>{
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
        });
    },[])


    useEffect(()=>{
        setpriceisLoading(true)

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
                console.log(data);
                console.log("즐겨찾기 변경 완료");
            });
        }
        

    },[tostr]);


    function InEnjoyList(item){

        for(let i = 0; i < tostr.length; i++){
            if(tostr[i] === item){
                return true;
            }
        }

        return false;
    }

    function EnjoyClick(item){
        if(!tostr.includes(item)){
            setTostr([item, ...tostr])
        }
        else{
            setTostr(tostr.filter(x=>x !== item))
        }
    }

    useEffect(()=>{

    },[tostr])

    return(
        <View>
            <SearchBar setSearchResult={setSearchresultStockList}/>
            
            {   searchresultStockList.map((item, idx)=>{
                return(
                    <TouchableOpacity style={styles.searchStocklist}>
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