import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, TouchableOpacity, Text, TextInput,StyleSheet, Dimensions} from 'react-native';
import {useEffect, useState} from 'react';



const styles = StyleSheet.create({

    searchbox: {
      backgroundColor: '#f2f2f2',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 10
    },

    inputbox: {
      backgroundColor: 'white',
      height: 40,
      width: 300,
      borderRadius: 10,
      alignSelf: 'center',
      marginLeft: 10,
      paddingLeft: 10
      
    },
    cancelbtn:{
        flex: 1,
        marginLeft: 10,
        alignSelf: 'center'
    },
    autobox:{
        position: 'absolute',
        top: 53,
        width: Dimensions.get('window').width  ,
        zIndex: 1,
        backgroundColor: 'white',
        elevation: 10
    },
    autoboxrow:{
        backgroundColor: 'white',
        height: 50,
        width: 300
    },
    autoboxtext:{
        fontSize: 15,
        marginLeft: 20,
        marginTop: 10
    }
  })

function SearchBar({setSearchResult}){


    let [autocompleteData, setAutocompleteData] = useState([]);     // local에서 받아올 주식이름 데이터

    let [autocompleteResult, setautocompleteResult] = useState([]);  //  화면에 출력할 자동완성 데이터
    let [autoboxTemp, setautoboxTemp] = useState();                   //  자동완성 리스트 활성화여부 State
    let [inputValue, setInputValue] = useState();                       // 검색창 값을 State로 관리

    let [printData, setPrintData] = useState(false);                // 검색 리스트 활성화여부 State              



    

    useEffect(()=>{
        // 주식이름 데이터 받아오기
        AsyncStorage.getItem('StockNames', (err, result)=>{
            setAutocompleteData(JSON.parse(result));
        })
    },[])

    


    // 검색창 검색시, 자동완성 리스트 filtering

    function inputChange(e){
        
        setautoboxTemp(true);       //  자동완성 리스트 활성화
        setInputValue(e);          
        let data = e;
        
        let filterdata=[];
        
        filterdata = autocompleteData.filter((x)=>      //  검색값 토대로 주식이름 데이터 filtering
            x.includes(data)
        );

        filterdata = filterdata.slice(0, 5)         //  자동완성 리스트 출력개수 조절

        if(data.length === 0){                      //  사용자가 검색창 지웠을때, 자동완성 리스트 없애기 위한 로직
            filterdata = [];
        }

        setautocompleteResult(filterdata);          //  자동완성 리스트 Set

    }



    // 우상단 '삭제' 버튼 눌렀을때의 동작
    function deleteHandler(){
        setInputValue();        // 검색창 초기화
        setautoboxTemp(false);  // 자동완성 리스트 초기화
        setSearchResult([]);    // 검색리스트 초기화
    }


    //  자동완성 리스트 클릭시 동작

    function stockClicked(data){
        console.log('autocomplete clicked');
        console.log(data);
        setPrintData(true);     //  검색리스트 활성화
        inputChange(data);      //  검색창 해당 주식명으로 바뀜
    }


    

    useEffect(()=>{
        if(printData){          //   자동완성 리스트가 갱신되고 && 검색리스트가 활성화 되었을때만 실행
            console.log('데이터 layout으로 전달');
            console.log(autocompleteResult);
            setSearchResult(autocompleteResult);        //   자동완성 리스트를 SearchLayout으로 넘김
            setautoboxTemp(false);                      //   자동완성 리스트 비활성화
            setPrintData(false);                        //   다시 검색리스트 비활성화로 초기화
        }
    },[autocompleteResult])


    
    



    return(
        <View style={{marginBottom: 20}}>

            <View style={{height: 55}}>
                
                <View style={styles.searchbox}>
                    <TextInput 
                        style={styles.inputbox}
                        placeholder='종목명을 입력하세요'
                        onChangeText={newText=>inputChange(newText)}
                        onSubmitEditing={()=>{stockClicked(inputValue)}}
                        value={inputValue}
                    />

                    <TouchableOpacity style={styles.cancelbtn} onPress={deleteHandler}>

                        <Text>삭제</Text>
                    </TouchableOpacity>

                </View>

            </View>


            <View style={styles.autobox}>
                {autoboxTemp && autocompleteResult.map((data) =>{
                    return(
                        <TouchableOpacity style={styles.autoboxrow} onPress={()=>{stockClicked(data)}} >
                            
                            <Text style={styles.autoboxtext}>{data}</Text>
                            
                        </TouchableOpacity>
                    )
                })}
            </View>

        </View>
        
    )
}

export default SearchBar;