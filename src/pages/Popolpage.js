import * as React from 'react';
import{Text,View, ScrollView} from 'react-native';
import Header from '../component/layout/Header';
import CartPopol from '../component/PopolElement/CartPopol';
import SelectPopol from '../component/PopolElement/SelectPopol';
import {useState, useEffect} from 'react';
import PopolModal from '../component/PopolElement/PopolModal';
import AlertModal from '../component/PopolElement/AlertModal';

function Popolpage({setLogin, navigation}){

    const [selectedPopol, setSelectedPopol] = useState(false);
    const [strategy, setStrategy] = useState();
    const [stklist, setStklist] = useState([]);
    
    const [popolModal, setPopolModal] = useState(false);

    const [ErrorModal, setErrorModal] = useState(false);
    const [errormessage, setErrormessage] = useState();
    const [errorheader,setErrorheader] = useState();

    return(<>

        <ScrollView style={{flexGrow:1, backgroundColor: 'white'}}>  
            <Header setLogin={setLogin} pageName={'포트폴리오'}/>

            { selectedPopol ?
                <CartPopol setSelectedPopol={setSelectedPopol} 
                    setStklist={setStklist} 
                    setPopolModal={setPopolModal} 
                    setErrorModal={setErrorModal}
                    setErrormessage={setErrormessage}
                    setErrorheader={setErrorheader}
                />
                :
                <SelectPopol 
                    setSelectedPopol={setSelectedPopol} 
                    setStrategy={setStrategy} 
                    setErrorModal={setErrorModal}
                    setErrormessage={setErrormessage}
                    setErrorheader={setErrorheader}
                />
            }
            
        </ScrollView>

        { ErrorModal?
        <>
            <View style={{
                position:'absolute', 
                flexGrow: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
                }}>
            </View>

            <AlertModal alertmessage={errormessage} alertheader={errorheader} setAlertModal={setErrorModal} navigation={null}/>
        </>
        :
        <></>
        }

        {popolModal ?
        <>
            <View style={{
                position:'absolute', 
                backgroundColor: 'rgba(0,0,0,0.5)',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
                }}>
            </View>

            <PopolModal setPopolModal={setPopolModal} strategy={strategy} stklist={stklist} navigation={navigation}/>
        </>
        :
        <></>

    }
    
    
    </>
    )
}

export default Popolpage;