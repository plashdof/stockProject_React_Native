// import DrawChart from './DrawChart';
import {useState, useEffect} from 'react';
import * as React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity} from 'react-native';

// const Container = styled.View`
//   height: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: beige;
// `;
const ChartInfoContainer = styled.View`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ChartDetailContainer = styled.View`
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ChartName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const ChartPrice = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-left: 10px;
`;
const BtnContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const SelectBtn = styled.TouchableOpacity`
  padding: 9px;
`;
const SelectBtnTxt = styled.Text``;
const FavBtn = styled.Image`
  margin: 0 10px 0 5px;
  height: 20px;
  width: 20px;
`;

const ChartContainer = styled.View`
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: beige;
`;

function Chart() {
  return (
    <>
      <ChartInfoContainer>
        <ChartDetailContainer>
          <ChartName>삼성전자</ChartName>
          <ChartPrice>59,500</ChartPrice>
        </ChartDetailContainer>
        <BtnContainer>
          <SelectBtn>
            <SelectBtnTxt>월</SelectBtnTxt>
          </SelectBtn>
          <SelectBtn>
            <Text>일</Text>
          </SelectBtn>
          <TouchableOpacity>
            <FavBtn source={require('./img/emptyStar.png')} />
          </TouchableOpacity>
        </BtnContainer>
      </ChartInfoContainer>
      <ChartContainer></ChartContainer>
    </>
  );
}

export default Chart;
