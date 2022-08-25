import * as React from 'react';
import{Text,View, ScrollView} from 'react-native';
import Header from '../component/layout/Header';
import CartPopol from '../component/PopolElement/CartPopol';
import SelectPopol from '../component/PopolElement/SelectPopol';
import {useState, useEffect} from 'react';

function Popolpage({setLogin}){

    const [selectedPopol, setSelectedPopol] = useState(false);
    const [submitData, setSubmitData] = useState([])

    return(
        <ScrollView style={{flexGrow:1, backgroundColor: 'white'}}>  
            <Header setLogin={setLogin} pageName={'포트폴리오'}/>

            { selectedPopol ?
                <CartPopol setSelectedPopol={setSelectedPopol} setSubmitData={setSubmitData} submitData={submitData}/>
                :
                <SelectPopol setSelectedPopol={setSelectedPopol} setSubmitData={setSubmitData}/>
            }
            
   
        </ScrollView>
    )
}

export default Popolpage;