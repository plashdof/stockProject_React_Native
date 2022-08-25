import * as React from 'react';
import {useState, useEffect} from 'react';
import {CandleStickChart} from 'react-native-charts-wrapper';
import DrawChart from '../HomeElement/DrawChart';

function MonthChart({props}) {
  let [chartdata, setChartdata] = useState([
    {shadowH: 0, shadowL: 0, open: 0, close: 0},
  ]);
  let [date, setDate] = useState();
  const [totalArr, setTotalArr] = useState([]);

  const [tempDataArr, setTempDataArr] = useState([]);
  const [tempDateArr, setTempDateArr] = useState([]);
  const [monthChartData, setMonthChartData] = useState();
  const [dataFetch1, setDataFetch1] = useState(false);
  const [dataFetch2, setDataFetch2] = useState(false);
  const [dataFetch3, setDataFetch3] = useState(false);

  useEffect(() => {
    setTotalArr([]);
    setTempDataArr([]);
    setTempDateArr([]);
    setChartdata(props.data);
    setDate(props.date);
    setDataFetch1(true);
  }, [props]);

  if (dataFetch1 && dataFetch2 === false) {
    for (let i = 0; i < date.length; i++) {
      totalArr.push([
        date[i],
        chartdata[i].shadowH,
        chartdata[i].open,
        chartdata[i].close,
        chartdata[i].shadowL,
      ]);
      if (i === date.length - 1) {
        setDataFetch2(true);
      }
    }
  }
  function compareNum(a, b) {
    return a - b;
  }
  if (dataFetch2 && dataFetch3 === false) {
    for (let j = 0; j < totalArr.length; j++) {
      let curMonth = totalArr[j + 1][0].slice(0, 7); //시작하는 달의 문자열 추출
      let curMonthDataArr = totalArr.filter(
        data => data[0].slice(0, 7) === curMonth,
      );

      let length = curMonthDataArr.length - 1;
      let curMonthHigh = curMonthDataArr.map(el => el[1]).sort(compareNum); //curMonth 고가 배열
      let curMonthLow = curMonthDataArr.map(el => el[4]).sort(compareNum); //curMonth 저가 배열
      let curMonthClose = curMonthDataArr[length][3]; //curMonth 종가
      let curMonthOpen = curMonthDataArr[0][2]; //curMonth 시가
      let curMonthStartDate = curMonthDataArr[0][0]; //curMonth start날짜
      tempDataArr.push({
        shadowH: curMonthHigh[curMonthHigh.length - 1],
        shadowL: curMonthLow[0],
        open: curMonthOpen,
        close: curMonthClose,
      });
      tempDateArr.push(curMonthStartDate.slice(0, 7));
      j = j + curMonthDataArr.length; //j curMonthDataArr의 Length만큼 증가
    }
    setDataFetch3(true);
    setMonthChartData({data: tempDataArr, date: tempDateArr});
    setDataFetch1(false);
    setDataFetch2(false);
    setDataFetch3(false);
  }

  return <>{monthChartData && <DrawChart props={monthChartData} />}</>;
}
export default MonthChart;
