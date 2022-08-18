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

    let [autocompleteData, setAutocompleteData] = useState([]);
    let [autocompleteResult, setautocompleteResult] = useState([]);
    let [autoboxTemp, setautoboxTemp] = useState();
    let [inputValue, setInputValue] = useState();

    let [printData, setPrintData] = useState(false);


    AsyncStorage.getItem('StockNames', (err, result)=>{
        setAutocompleteData(JSON.parse(result));
    })


    function inputChange(e){
        console.log(e);
        setautoboxTemp(true);
        setInputValue(e);
        let data = e;
        
        let filterdata=[];
        
        filterdata = autocompleteData.filter((x)=>
            x.includes(data)
        );

        filterdata = filterdata.slice(0, 5)

        if(data.length === 0){
            filterdata = [];
        }

        setautocompleteResult(filterdata);

    }

    function onKeyPress(e){
        if(e.key=="Enter"){
            console.log('ddd')
        }
    }

    function deleteHandler(){
        setInputValue();
        setautoboxTemp(false);
        setSearchResult([]);
    }

    function stockClicked(data){
        console.log(data);
        setPrintData(true);
        inputChange(data);
    }

    useEffect(()=>{
        if(printData){
            setSearchResult(autocompleteResult);
            setautoboxTemp(false);
            setPrintData(false);
        }
    },[autocompleteResult])
    



    return(
        <>

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
                        <TouchableOpacity style={styles.autoboxrow} onPress={()=>{stockClicked(data)}}>
                            <Text style={styles.autoboxtext}>{data}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

        </>
        
    )
}

export default SearchBar;