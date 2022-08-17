import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
const Container = styled.View`
  height: 100px;
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

function ChartSearch() {
  return (
    <Container>
      <SearchBar>
        <SearchIcon source={require('./img/searchIcon.png')} />
        <InputBox placeholder="종목명을 입력하세요."></InputBox>
        <TouchableOpacity>
          <DeleteBtn source={require('./img/close.png')} />
        </TouchableOpacity>
      </SearchBar>
    </Container>
  );
}
export default ChartSearch;
