import {useState, useEffect} from 'react';
import * as React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity} from 'react-native';
import DayChart from './DayChart';
import MonthChart from './MonthChart';

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
  font-size: 25px;
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
  const [chartType, setChartType] = useState('month');
  const [totalStock, setTotalStock] = useState([]);
  const [stockNames, setStockNames] = useState();
  const [stockCodes, setStockCodes] = useState();

  const [selectedStock, setSelectedStock] = useState(['삼성전자', '005930']);
  useEffect(() => {
    AsyncStorage.getItem('StockNames', (err, result) => {
      setStockNames(JSON.parse(result));
    });
    AsyncStorage.getItem('StockCodes', (err, result) => {
      setStockCodes(JSON.parse(result));
    });
  }, []);

  //종목명, 코드 가겨오기
  //indexOf로 이름,코드 연결

  function handleChartType(e) {
    setChartType(e);
  }

  const selectChartType = {
    day: <DayChart />,
    month: <MonthChart />,
    // day: <DayChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />,
    // month: (
    //   <MonthChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />
    // ),
  };

  return (
    <>
      <ChartInfoContainer>
        <ChartDetailContainer>
          <ChartName>{selectedStock[0]}</ChartName>
          <ChartPrice>59,500</ChartPrice>
        </ChartDetailContainer>
        <BtnContainer>
          <SelectBtn onPress={() => handleChartType('month')}>
            <SelectBtnTxt>월</SelectBtnTxt>
          </SelectBtn>
          <SelectBtn onPress={() => handleChartType('day')}>
            <Text>일</Text>
          </SelectBtn>
          <TouchableOpacity>
            <FavBtn source={require('./img/emptyStar.png')} />
          </TouchableOpacity>
        </BtnContainer>
      </ChartInfoContainer>
      <ChartContainer>{selectChartType[chartType]}</ChartContainer>
    </>
  );
}

export default Chart;
