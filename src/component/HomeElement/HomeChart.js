import DrawChart from "./DrawChart";
import {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles=StyleSheet.create({
    
    HomeChartBox:{
        flex: 10,
        marginTop: 20,
        backgroundColor: 'white',  
        borderRadius: 8,       
        marginLeft: 10,
        marginRight: 10
    },
    
    // RN 에서의 boxshadow 방식.
    // 반드시 backgroundColor : 'white' 해줘야 생각대로 적용됨

    elevation:{
        shadowColor: '#52006A',  
        elevation: 3,  
    },

    HomeChart:{
        flex: 5,
        marginBottom: 100
    }
})

const btnstyles=StyleSheet.create({

    SelectChartbtn:{
        marginLeft: 10,
    },

})


function HomeChart(){

    let [chartData1, setchartData1] = useState({    // 코스피 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });
    let [chartData2, setchartData2] = useState({    // 코스닥 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });
    let [chartData3, setchartData3] = useState({    // 원/환율 차트 데이터
        Open: {'keys':'values'},
        High: {'keys':'values'},
        Low:{'keys':'values'},
        Close:{'keys': 'values'}
    });

    


    let [chartDataObj1, setchartDataObj1] = useState(null);  // 코스피 차트 데이터 객체
    let [chartDataObj2, setchartDataObj2] = useState(null);  // 코스닥 차트 데이터 객체
    let [chartDataObj3, setchartDataObj3] = useState(null);  // 원/환율 차트 데이터 객체

    let [endfetchdata1, setEndfetchdata1] = useState(false);    // 흐름제어를 위한 fetch 종료상태 State
    let [endfetchdata2, setEndfetchdata2] = useState(false);
    let [endfetchdata3, setEndfetchdata3] = useState(false);

    let [clickedKospi, setclickedKospi] = useState(true);       // 코스피 버튼 상태
    let [clickedKosdak, setclickedKosdak] = useState(false);    // 코스닥 버튼 상태
    let [clickedwon, setclickedwon] = useState(false);          // 원/환율 버튼 상태

    let [chartName, setchartName] = useState('kospi');          // 차트 상단 주식명

    let [chartPrice1,setchartPrice1] = useState();           // Kospi 주식가격
    let [chartPrice2,setchartPrice2] = useState();           // Kosdak 주식가격
    let [chartPrice3,setchartPrice3] = useState();           // 원/환율 주식가격
    let [chartPrice, setchartPrice] = useState(); // 출력용 주식가격


    let [rising1, setRising1] = useState(true);        // Kospi 상승지표
    let [rising2, setRising2] = useState(true);        // Kosdak 상승지표 
    let [rising3, setRising3] = useState(true);        // 원/환율 상승지표
    let [rising, setRising] = useState(true);  // 출력용 상승지표






    /*   차트데이터 fetching. 

        fetching 종료시, fetch 상태 State를 true로 바꿔줌
        chartData State 객체에 저장   
        
         자동완성데이터 fetching
    
    */

    useEffect(()=>{

        // 코스피 
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': 'KS11',
                'start': '2022-06-25',
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response =>  response.json())
        .then(data => { 
            setEndfetchdata1(true);
            setchartData1(data);
            console.log(data);

            /* 최초렌더링시, 가장먼저보이는 Kospi의 가격과 가격색깔을 적용 */

            const Closetemp = Object.values(data.Close);     
            const Opentemp = Object.values(data.Open);
            const size = Closetemp.length - 1
            setchartPrice(Closetemp[size])
            if(Opentemp[size] > Closetemp[size]){
                setRising(false);
            }
        })

        // 코스닥
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': 'KQ11',
                'start': '2022-06-25'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response =>  response.json())
        .then(data => {
            setEndfetchdata2(true);
            setchartData2(data);
            console.log(data);
        }) 


        // 원/환율
        fetch('http://54.215.210.171:8000/getPrice',{
            method: 'POST',
            body: JSON.stringify({
                'code': 'USD/KRW',
                'start': '2022-07-01'
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response => response.json() )
        .then(data => {
            setEndfetchdata3(true);
            setchartData3(data);
            console.log(data);
        }) 


        // 자동완성 데이터 저장
        fetch(`http://54.215.210.171:8000/getNameToCode`)
        .then((response) => response.json())
        .then((data) => {
            
            AsyncStorage.setItem('StockNames', JSON.stringify(Object.keys(data))); //전체 종목명 배열
            AsyncStorage.setItem('StockCodes', JSON.stringify(Object.values(data))); //전체 코드 배열
            setLoading(false);
        });

    },[])



    // chartData 가 변경되었을때 랜더링, 
    // fetch가 정상종료된 경우일때만 parsing 함수 실행


    useEffect(()=>{
        if(endfetchdata1){
            
            parsing1();
        }
    },[chartData1])

    useEffect(()=>{
        if(endfetchdata2){
            
            parsing2();
        }
    },[chartData2])

    useEffect(()=>{
        if(endfetchdata3){
            
            parsing3();
        }
    },[chartData3])
    

    


    /* 서버에서 오는 데이터를 parsing 

        1. 차트 그리기용 데이터 형태

            [{shadowH: num, shadowL: num, open: num, close: num}, ... ]  
            shadowH == High,  shadowL == Low
    
        2. 차트 하단에 표시할 날짜데이터 형태

            ['2022-07-01', '2022-07-02', ...]
            string 배열로 parsing
    
    */



    function parsing1(){       // 코스피 데이터 parsing

        let date = Object.keys(chartData1.Open)
        let open = Object.values(chartData1.Open)
        let shadowH = Object.values(chartData1.High)
        let shadowL = Object.values(chartData1.Low)
        let close = Object.values(chartData1.Close)

        let size = date.length;
        
        let data = []
        for(let i = 0; i < size; i++){       
            data.push({
                shadowH: Number(shadowH[i]),
                shadowL: Number(shadowL[i]),
                open: Number(open[i]),
                close: Number(close[i])
            })
        }
        
        setchartPrice1(close[size - 1])         // close의 마지막 원소를 현재가격으로 출력
        if(open[size - 1] > close[size - 1]){   // 종가가 시가보다 낮은경우, 파란색으로
            setRising1(false);
        }

        setchartDataObj1({data, date});         //  parsing 종료시, Obj 에 data, date로 구분하여 담음

    }

    function parsing2(){    // 코스닥 데이터 parsing
        
        let date = Object.keys(chartData2.Open)
        let open = Object.values(chartData2.Open)
        let shadowH = Object.values(chartData2.High)
        let shadowL = Object.values(chartData2.Low)
        let close = Object.values(chartData2.Close)

        let size = date.length;
        
        let data = []
        for(let i = 0; i < size; i++){
            data.push({
                shadowH: Number(shadowH[i]),
                shadowL: Number(shadowL[i]),
                open: Number(open[i]),
                close: Number(close[i])
            })
        }
        
        setchartPrice2(close[size - 1])         // close의 마지막 원소를 현재가격으로 출력
        if(open[size - 1] > close[size - 1]){   // 종가가 시가보다 낮은경우, 파란색으로
            setRising2(false);
        }

        setchartDataObj2({data, date});         //  parsing 종료시, Obj 에 data, date로 구분하여 담음

    }

    function parsing3(){    // 원/환율 데이터 parsing
        
        let date = Object.keys(chartData3.Open)
        let open = Object.values(chartData3.Open)
        let shadowH = Object.values(chartData3.High)
        let shadowL = Object.values(chartData3.Low)
        let close = Object.values(chartData3.Close)

        let size = date.length;
        
        let data = []
        for(let i = 0; i < size; i++){
            data.push({
                shadowH: Number(shadowH[i]),
                shadowL: Number(shadowL[i]),
                open: Number(open[i]),
                close: Number(close[i])
            })
        }

        
        setchartPrice3(close[size - 1])         // close의 마지막 원소를 현재가격으로 출력
        if(open[size - 1] > close[size - 1]){   // 종가가 시가보다 낮은경우, 파란색으로
            setRising3(false);
        }

        setchartDataObj3({data, date});         //  parsing 종료시, Obj 에 data, date로 구분하여 담음

    }



    // 메인차트 토글버튼 구현.
    // Kospi, Kosdak, 원/환율 버튼 각각 클릭시 State 변수 변경.


    function ClickKospi(){
        
        setclickedKospi(true);
        setclickedKosdak(false);
        setclickedwon(false);
        setchartName('kospi');
        setchartPrice(chartPrice1);
        setRising(rising1);
    }

    function ClickKosdak(){

        setclickedKosdak(true);
        setclickedKospi(false);
        setclickedwon(false);
        setchartName('kosdak');
        setchartPrice(chartPrice2);
        setRising(rising2);
    }

    function ClickWon(){
        
        setclickedwon(true);
        setclickedKospi(false);
        setclickedKosdak(false);
        setchartName('원/환율');
        setchartPrice(chartPrice3);
        setRising(rising3);
    }




    // 삼항연산자, State변수로 버튼클릭시 디자인 변경
    // root 컴포넌트의 height 를 설정하여, Scroll 용이하게 만듬
    // flex로 각 컴포넌트 사이의 비율 조정


    return(<View style={{height: 330}}>

        <View style={{flex:1, height: 50,flexDirection:'row', justifyContent:'flex-end', borderBottomColor: '#E3E3E3', borderBottomWidth: 1, marginTop: 20}}>
            <TouchableOpacity 
                style={[btnstyles.SelectChartbtn, 
                        {borderBottomColor: clickedKospi ? 'black' : 'white', 
                        borderBottomWidth: clickedKospi ? 1 : 0}]} 
                onPress={ClickKospi}
            >

                <Text style={{fontWeight: clickedKospi ? 'bold' : 'none'}}>코스피</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[btnstyles.SelectChartbtn, 
                        {borderBottomColor: clickedKosdak ? 'black' : 'white', 
                        borderBottomWidth: clickedKosdak ? 1 : 0}]} 
                onPress={ClickKosdak}
            >

                <Text style={{fontWeight: clickedKosdak ? 'bold' : 'none'}}>코스닥</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[btnstyles.SelectChartbtn, 
                        {borderBottomColor: clickedwon ? 'black' : 'white', 
                        borderBottomWidth: clickedwon ? 1 : 0}]} 
                onPress={ClickWon}
            >

                <Text style={{fontWeight: clickedwon ? 'bold' : 'none'}}>원/환율</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.HomeChartBox, styles.elevation]}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={{fontWeight:'bold', fontSize: 20, color: 'black'}}> {chartName} </Text>
                {chartPrice && <Text style={{ fontSize: 20, color: rising ? 'red' : 'blue'}}> {chartPrice} </Text>}
            </View>

            <View style={styles.HomeChart}>
                {chartDataObj1 && clickedKospi && <DrawChart props={chartDataObj1}/>}
                {chartDataObj2 && clickedKosdak && <DrawChart props={chartDataObj2}/>}
                {chartDataObj3 && clickedwon && <DrawChart props={chartDataObj3}/>}
            </View>
        </View>
    
    </View>
    )
}

export default HomeChart;