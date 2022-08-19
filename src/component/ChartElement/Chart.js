import {useState, useEffect, useRef} from 'react';
import * as React from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity} from 'react-native';
import DayChart from './DayChart';
import MonthChart from './MonthChart';

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
  font-size: 18px;
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
  height: 350px;
  display: flex;
  flex-direction: column;
  background-color: beige;
`;

function Chart(props) {
  const [chartType, setChartType] = useState('month');
  const [chartDataObj1, setchartDataObj1] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(true);
  const [tostr, settostr] = useState([]); //즐겨찾기 목록
  const [afterFirstFetch, setafterFirstFetch] = useState(false);

  const selectedStock = props.props;

  let [uuid, Setuuid] = useState(-1);

  AsyncStorage.getItem('uuid', (err, result) => {
    Setuuid(result);
  });

  function handleChartType(e) {
    setChartType(e);
  }

  const selectChartType = {
    day: <DayChart props={chartDataObj1} />,
    month: <MonthChart props={chartDataObj1} />,
    // day: <DayChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />,
    // month: (
    //   <MonthChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />
    // ),
  };

  /* 즐겨찾기 */
  //유저의 즐겨찾기 목록 가져오기
  useEffect(() => {
    fetch(`http://haniumproject.com/getUserAccount`, {
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
      fetch(`http://haniumproject.com/setUserFavList`, {
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
    // fetch("http://54.215.210.171:8000/getPrice", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     code: stockRef.current[0],
    //     start: "2022-06-27",
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setchartData1(data);
    //      setChartLoading(false);
    //   });
    // fetch("http://54.215.210.171:8000/getPreview", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     code: [stockRef.current[0]],
    //   }),
    //   headers: {
    //     "Content-Type": "./application.json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSelectedCodePrice(data);
    //     setPreviewLoading(false);
    //   });
    console.log('차트데이터받아옴');
  };

  useEffect(() => {
    chartData();
    interval.current = setInterval(chartData, 10000);
    return () => {
      clearInterval(interval.current);
    };
  }, [selectedStock]);

  /*차트 그리기*/

  let [chartData1, setchartData1] = useState({
    Open: {keys: 'values'},
    High: {keys: 'values'},
    Low: {keys: 'values'},
    Close: {keys: 'values'},
  });

  function parsing1() {
    setchartDataObj1({
      date: Object.keys(chartData1.Open),
      open: Object.values(chartData1.Open),
      high: Object.values(chartData1.High),
      low: Object.values(chartData1.Low),
      close: Object.values(chartData1.Close),
    });
  }

  useEffect(() => {
    parsing1();
  }, [chartData1]);

  return (
    <>
      <ChartInfoContainer>
        <ChartDetailContainer>
          <ChartName>{selectedStock}</ChartName>
          <ChartPrice>59,500</ChartPrice>
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
      <ChartContainer>{selectChartType[chartType]}</ChartContainer>
    </>
  );
}

export default Chart;
