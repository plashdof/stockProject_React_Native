import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text} from 'react-native';

function ChartAnalysis({props}) {
  let [chartdata, setChartdata] = useState([
    {shadowH: 0, shadowL: 0, open: 0, close: 0},
  ]);
  const [dataFetch, setDataFetch] = useState(false);

  useEffect(() => {
    //setChartdata(props.data);
    setDataFetch(true);
  }, [props]);

  let testData = [
    {shadowH: 1, shadowL: 10, open: 0, close: 0},
    {shadowH: 0, shadowL: 30, open: 0, close: 0},
    {shadowH: 100, shadowL: 40, open: 0, close: 0},
    {shadowH: 0, shadowL: 50, open: 0, close: 0},
    {shadowH: 30, shadowL: 60, open: 0, close: 0},
  ];

  if (testData.length > 364) {
    testData = testData.slice(0, 364);
  }

  var max = testData.reduce(function (prev, curr) {
    return prev.shadowH > curr.shadowH ? prev : curr;
  });
  var min = testData.reduce(function (prev, curr) {
    return prev.shadowL < curr.shadowL ? prev : curr;
  });
  return (
    <>
      {min.shadowL && max.shadowH && (
        <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>
          {max.shadowH} / {min.shadowL} 원
        </Text>
      )}
    </>
  );
}
export default ChartAnalysis;
