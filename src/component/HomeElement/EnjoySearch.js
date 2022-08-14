import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles=StyleSheet.create({

    EnjoySearchBox:{
        backgroundColor: 'white',  
        borderRadius: 8,   
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10
    },
    elevation:{
        shadowColor: '#52006A',  
        elevation: 20, 
    }
})

function EnjoyChart(){
    return(
        <View style={[styles.EnjoySearchBox, styles.elevation]}>
            <Text>asdf</Text>
            <Text>asdf</Text>
            <Text>asdf</Text>
            <Text>asdf</Text>
            <Text>asdf</Text>
            <Text>asdf</Text>
        </View>
    )
}

export default EnjoyChart