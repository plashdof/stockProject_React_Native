import * as React from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';


const styles=StyleSheet.create({
    ModalBox:{
        position: 'absolute',
        height: 120,
        left: 70,
        right: 70,
        marginTop: 150,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 5,
        elevation: 5
    },
    ModalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E7E7E7',
        height: 40,
        paddingHorizontal: 10
    },
    ModalMain:{
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    HeaderText:{textAlign:'center', color: 'black', fontSize: 13, fontWeight: 'bold', marginTop: 10},
    MainText:{
        color:'black',
        marginTop: 10
    },
    popolbtn:{
        position: 'relative',
        width: 70,
        height: 20,
        left: 70,
        top: 20,
        borderRadius: 3
    }

})

function AlertModal({alertmessage, alertheader, setAlertModal}){


    function ConfirmModalHandler(){
        setAlertModal(false);
    }
    

    return(

        <View style={styles.ModalBox}>
            <View style={styles.ModalHeader}>
                <Text style={styles.HeaderText}>{alertheader}</Text>
            </View>

            <View style={styles.ModalMain}>
                

                <View style={{flexDirection:'row'}}>
                    <Text style={styles.MainText}>{alertmessage}</Text>
                </View>

                
                <TouchableOpacity style={[styles.popolbtn,{backgroundColor: '#2F2D2B'}]} onPress={ConfirmModalHandler}>
                    <Text style={{color: 'white', textAlign: 'center'}}>확인</Text>
                </TouchableOpacity>

                
                
            </View>
        </View>

    
    )
}

export default AlertModal;