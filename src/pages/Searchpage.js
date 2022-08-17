import * as React from 'react';
import{Text,View} from 'react-native';
import Header from '../component/layout/Header';
import SearchLayout from '../component/SearchElement/SearchLayout';

function Searchpage({setLogin}){
    return(
        <View style={{flexGrow:1, backgroundColor: 'white'}}>  
            <Header setLogin={setLogin} pageName={'검색'}/>

            <SearchLayout/>
        </View>
    )
}

export default Searchpage;