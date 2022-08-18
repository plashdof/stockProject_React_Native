import * as React from 'react';
import {View, processColor} from 'react-native';
import {useState, useEffect} from 'react';
import { CandleStickChart } from 'react-native-charts-wrapper';



function DrawChart({props}){

    // HomeChart.js 에서 받아올 차트데이터 형태
    let [chartdata, setChartdata] = useState([{shadowH: 0, shadowL: 0, open: 0, close: 0}])




    useEffect(()=>{
        setChartdata(props.data);
    },[])



    


    /* 데이터 라이브러리에 적용 */
    // 컴포넌트 명세서 : https://github.com/wuxudong/react-native-charts-wrapper/blob/master/docs.md
    // 샘플코드 : https://github.com/wuxudong/react-native-charts-wrapper/tree/master/Example/app

    const data={

        dataSets:[{
            values: chartdata,          
            label: 'KOSPI',
            config: {
                highlightColor: processColor('darkgray'),
                drawValues:false,
                shadowColor: processColor('black'), 
                shadowWidth: 1,
                shadowColorSameAsCandle: true,
                increasingColor: processColor('red'),       // 상승차트 빨간색
                increasingPaintStyle: 'FILL',               // 차트내부 색 채우기
                decreasingColor: processColor('blue')       // 하강차트 파랑색
              }
        }]
        
    }


    // 캔들 눌렀을때 ShadowH 표시
    const marker={
        enabled: true,                          
        markerColor: processColor('#2c3e50'),
        textColor: processColor('white'),
    }


    // x축에 표시할 데이터 props.date로 지정. 하단에 위치시킴
    const xAxis={
        position:'BOTTOM',
        valueFormatter: props.date
    }
    

    // 범례 지우기
    const legend={
        enabled: false,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
    }
    

    // description 지우기
    const description={
        text:''
    }


    


    return (
        <View style={{height: 200}}>
            <CandleStickChart
                chartDescription={description}
                style={{flex:1, flexDirection:'row'}}
                data={data}
                marker={marker}
                xAxis={xAxis}
                legend={legend}
            />

        </View>
        
    );

}

export default DrawChart;