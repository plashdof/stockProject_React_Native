import * as React from 'react';
import{Text,ScrollView} from 'react-native';
import Header from '../component/layout/Header';
import SearchLayout from '../component/SearchElement/SearchLayout';

function Searchpage({navigation, setLogin}){


    function gotoChart(){
        navigation.navigate('Chartpage');
    }

    return(
        <ScrollView style={{flexGrow:1, backgroundColor: 'white'}}>  
            <Header setLogin={setLogin} pageName={'검색'}/>

            <SearchLayout gotoChart={gotoChart}/>
        </ScrollView>
    )
}

export default Searchpage;