import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text} from 'react-native';

function ChartAnalysis({props}) {
  let [chartdata, setChartdata] = useState([
    {shadowH: 0, shadowL: 0, open: 0, close: 0},
  ]);
  const [dataFetch, setDataFetch] = useState(false);

  useEffect(() => {
    setChartdata(props.data);
    setDataFetch(true);
  }, [props]);

  if (dataFetch) {
    if (chartdata.length > 364) {
      chartdata = chartdata.slice(0, 364);
    }

    var max = chartdata.reduce(function (prev, curr) {
      return prev.shadowH > curr.shadowH ? prev : curr;
    });
    var min = chartdata.reduce(function (prev, curr) {
      return prev.shadowL < curr.shadowL ? prev : curr;
    });
  }

  return (
    <>
      {dataFetch && min.shadowL && max.shadowH && (
        <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>
          {max.shadowH.toLocaleString('ko-KR')} /{' '}
          {min.shadowL.toLocaleString('ko-KR')} 원
        </Text>
      )}
    </>
  );
}
export default ChartAnalysis;
