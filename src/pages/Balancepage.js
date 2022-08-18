import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Balance from '../component/BalanceElement/Balance';
import Header from '../component/layout/Header';

function Balancepage({setLogin}) {
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Header setLogin={setLogin} pageName={'잔고확인'} />
        <Balance />
      </ScrollView>
    </>
  );
}

export default Balancepage;
