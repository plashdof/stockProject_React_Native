import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './Chart';

const Container = styled.View`
  padding: 30px 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SearchBar = styled.View`
  width: 350px;
  height: 42px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  display: flex;
  flex-direction: row;
`;
const SearchIcon = styled.ImageBackground`
  flex: 1;
  height: 20px;
  width: 20px;
  margin: 10px 0 0 10px;
`;
const InputBox = styled.TextInput`
  width: 280px;
`;
const DeleteBtn = styled.Image`
  width: 20px;
  height: 20px;
  margin: 11px 10px 0 5px;
`;
const ResultBox = styled.View`
  position: absolute;
  height: 400px;
  background-color: tomato;
`;
const ResultBtn = styled.TouchableOpacity`
  height: 52px;
  width: 100%;
  cursor: pointer;
  border: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;
function ChartSearch() {
  const [keyword, setKeyword] = useState('');
  const [stockNames, setStockNames] = useState();
  const [stockCodes, setStockCodes] = useState();
  const [result, setResult] = useState([]); //검색된 키워드를 포함하는 종목 배열(자동완성 리스트)
  const [selectedStock, setSelectedStock] = useState('삼성전자'); //선택된 종목
  useEffect(() => {
    AsyncStorage.getItem('StockNames', (err, result) => {
      setStockNames(JSON.parse(result));
    });
    AsyncStorage.getItem('StockCodes', (err, result) => {
      setStockCodes(JSON.parse(result));
    });
  }, []);

  useEffect(() => {
    if (keyword !== '') {
      const temp = stockNames
        .filter(item => item.includes(keyword))
        .slice(0, 5);
      setResult(temp);
    } else {
      setResult([]);
    }
  }, [keyword]);

  function selectStock(e) {
    setKeyword('');
    setSelectedStock(e);
  }
  return (
    <>
      <Container style={{position: 'relative', zIndex: 2}}>
        <SearchBar>
          <SearchIcon source={require('./img/searchIcon.png')} />
          <InputBox
            placeholder="종목명을 입력하세요."
            value={keyword}
            onChangeText={setKeyword}></InputBox>
          <TouchableOpacity onPress={() => setKeyword('')}>
            <DeleteBtn source={require('./img/close.png')} />
          </TouchableOpacity>
        </SearchBar>

        {result.length ? (
          <View
            style={{
              width: 340,
              height: result.length * 52,
              backgroundColor: '#f2f2f2',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            {result.map(stock => {
              return (
                <ResultBtn
                  key={stock}
                  onPress={() => {
                    selectStock(stock);
                  }}>
                  <Text style={{color: 'black', marginLeft: 32, marginTop: 5}}>
                    {stock}
                  </Text>
                  <Text
                    style={{color: '#9c9c9c', fontSize: 13, marginLeft: 32}}>
                    {stockCodes[stockNames.indexOf(stock)]}
                  </Text>
                </ResultBtn>
              );
            })}
          </View>
        ) : (
          <></>
        )}
      </Container>
      <View style={{position: 'absolute', top: 170, zIndex: 1}}>
        <Chart props={selectedStock} />
      </View>
    </>
  );
}
export default ChartSearch;
