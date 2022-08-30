import {useState, useEffect, useRef} from 'react';
import * as React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity, View} from 'react-native';
import DayChart from './DayChart';
import MonthChart from './MonthChart';
import DrawChart from '../HomeElement/DrawChart';
import ChartAnalysis from './ChartAnalysis';

const ChartInfoContainer = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const ChartDetailContainer = styled.View`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const ChartName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: black;
`;
const ChartPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const BtnContainer = styled.View`
  width: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
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
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid #cdcdcd;
  margin: 10px;
  shadow-color: #000;
  elevation: 3;
  background-color: white;
  border-radius: 8px;
`;
const ChartHighLowContainer = styled.View`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #cdcdcd;
  margin: 10px 10px 10px 10px;
`;

function Chart(props) {
  const [chartType, setChartType] = useState('day');
  const [chartDataObj1, setchartDataObj1] = useState(null);
  const [tostr, settostr] = useState([]); //즐겨찾기 목록
  const [afterFirstFetch, setafterFirstFetch] = useState(false);
  let [endfetchdata, setEndfetchdata] = useState(false);
  let [chartPrice, setChartPrice] = useState();
  let [chartData1, setchartData1] = useState({
    Open: {keys: 'values'},
    High: {keys: 'values'},
    Low: {keys: 'values'},
    Close: {keys: 'values'},
  });
  let [rising, setRising] = useState(true);

  const selectedStock = props.props;
  const stockRef = useRef(); //3초마다 데이터 가져오기위함. 현재 선택된 종목ref
  let [uuid, Setuuid] = useState(-1);

  AsyncStorage.getItem('uuid', (err, result) => {
    Setuuid(result);
  });
  function handleChartType(e) {
    setChartType(e);
  }

  const selectChartType = {
    day: <DrawChart props={chartDataObj1} />,
    month: <MonthChart props={chartDataObj1} />,
  };

  /* 즐겨찾기 */
  //유저의 즐겨찾기 목록 가져오기
  useEffect(() => {
    fetch(`http://haniumproject.com:8000/getUserAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        uuid: uuid,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        settostr(data.favlist.split(','));
        setafterFirstFetch(true);
      });
  }, []);

  //tostr 서버에 전송?
  useEffect(() => {
    if (afterFirstFetch) {
      fetch(`http://haniumproject.com:8000/setUserFavList`, {
        method: 'POST',
        body: JSON.stringify({
          target: tostr.toString(),
        }),
        headers: {
          'Content-Type': 'application/json',
          uuid: uuid,
        },
      }).then(response => response.json());
    }
  }, [tostr]);

  //즐겨찾기 버튼 클릭시
  function EnjoySearchHandler(e) {
    if (!tostr.includes(e)) {
      settostr([e, ...tostr]);
    } else {
      settostr(tostr.filter(x => x !== e));
    }

    console.log(tostr);
  }

  const interval = useRef(null);
  const chartData = () => {
    //차트 데이터 받아오기
    fetch('http://54.215.210.171:8000/getPrice', {
      method: 'POST',
      body: JSON.stringify({
        code: selectedStock,
        start: '2022-06-25',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setchartData1(data);
        setEndfetchdata(true);
        const Closetemp = Object.values(data.Close);
        const Opentemp = Object.values(data.Open);
        const size = Closetemp.length - 1;
        setChartPrice(Closetemp[size].toLocaleString('ko-KR'));
        if (Opentemp[size] > Closetemp[size]) {
          setRising(false);
        } else {
          setRising(true);
        }
      });
  };

  useEffect(() => {
    chartData();
    interval.current = setInterval(chartData, 60000); //1분마다 함수 실행

    return () => {
      clearInterval(interval.current);
    };
  }, [selectedStock]);

  /*차트 그리기*/

  useEffect(() => {
    if (endfetchdata) {
      parsing1();
    }
  }, [chartData1, endfetchdata]);

  function parsing1() {
    let date = Object.keys(chartData1.Open);
    let open = Object.values(chartData1.Open);
    let shadowH = Object.values(chartData1.High);
    let shadowL = Object.values(chartData1.Low);
    let close = Object.values(chartData1.Close);
    let size = date.length;

    let data = [];
    for (let i = 0; i < size; i++) {
      data.push({
        shadowH: Number(shadowH[i]),
        shadowL: Number(shadowL[i]),
        open: Number(open[i]),
        close: Number(close[i]),
      });
    }

    setchartDataObj1({data, date}); //  parsing 종료시, Obj 에 data, date로 구분하여 담음
  }

  return (
    <View>
      <ChartInfoContainer>
        <ChartDetailContainer>
          <ChartName>{selectedStock}</ChartName>
          <ChartPrice style={{color: rising ? '#DA3F33' : '#3F77E5'}}>
            {chartPrice}
          </ChartPrice>
        </ChartDetailContainer>
        <BtnContainer>
          <SelectBtn onPress={() => handleChartType('month')}>
            <SelectBtnTxt>월</SelectBtnTxt>
          </SelectBtn>
          <SelectBtn onPress={() => handleChartType('day')}>
            <Text>일</Text>
          </SelectBtn>
          <TouchableOpacity onPress={() => EnjoySearchHandler(selectedStock)}>
            {tostr.includes(selectedStock) ? (
              <FavBtn source={require('./img/filledStar.png')} />
            ) : (
              <FavBtn source={require('./img/emptyStar.png')} />
            )}
          </TouchableOpacity>
        </BtnContainer>
      </ChartInfoContainer>
      <ChartContainer>
        {selectChartType[chartDataObj1 && chartType]}
      </ChartContainer>
      <ChartHighLowContainer>
        <Text style={{marginLeft: 10}}>52주 최고/최저</Text>
        {chartDataObj1 && <ChartAnalysis props={chartDataObj1} />}
      </ChartHighLowContainer>
    </View>
  );
}

export default Chart;
