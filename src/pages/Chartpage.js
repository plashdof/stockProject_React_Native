import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../component/layout/Header';
import Chart from '../component/ChartElement/Chart';

function Chartpage({setLogin, route}) {
  // 여기서 route.params.name 을하면, Searchpage에서 클릭한 주식이름을 받을수 있습니다
  // 근데 Searchpage 클릭이 아닌 그냥 BottomTab으로 최초 Chartpage 이동하게되면, 오류가납니다!

  useEffect(() => {
    // console.log(route.params.name);
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <Header setLogin={setLogin} pageName={'차트'} />
        <Chart contentContainerStyle={{flex: 1}} />
      </ScrollView>
    </>
  );
}

export default Chartpage;
