import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../component/layout/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartSearch from '../component/ChartElement/ChartSearch';
import Chart from '../component/ChartElement/Chart';


function Chartpage({setLogin}) {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Header setLogin={setLogin} pageName={'차트'} />
        <ChartSearch contentContainerStyle={{flex: 1}} />
      </ScrollView>
    </>
  );
}



export default Chartpage;
