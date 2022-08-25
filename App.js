import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from './src/pages/Homepage';
import Chartpage from './src/pages/Chartpage';
import Balancepage from './src/pages/Balancepage';
import Popolpage from './src/pages/Popolpage';
import Searchpage from './src/pages/Searchpage';
import Signuppage from './src/pages/login/Signuppage';
import Firstpage from './src/pages/login/Firstpage';





const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function App(){


  // 개발시 true로 설정하면, 앱 키자마자 home으로 넘어갑니다
  const [isLogin, setisLogin] = useState(true);

  return (
    <NavigationContainer>
      {isLogin ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused, color, size}) =>{
              let iconName;

              if (route.name === 'Homepage'){
                iconName = focused ? require('./src/assets/Tabimg/home_dark.png') :
                require('./src/assets/Tabimg/home.png')
              }

              if (route.name === 'Chartpage'){
                iconName = focused ? require('./src/assets/Tabimg/chart_dark.png') :
                require('./src/assets/Tabimg/chart.png')
              }

              if (route.name === 'Balancepage'){
                iconName = focused ? require('./src/assets/Tabimg/money_dark.png') :
                require('./src/assets/Tabimg/money.png')
              }

              if (route.name === 'Popolpage'){
                iconName = focused ? require('./src/assets/Tabimg/popol_dark.png') :
                require('./src/assets/Tabimg/popol.png')
              }

              if (route.name === 'Searchpage'){
                iconName = focused ? require('./src/assets/Tabimg/search_dark.png') :
                require('./src/assets/Tabimg/search.png')
              }

              return <Image source={iconName} style={{width: 25, height: 25}} />

            }

            

          })}
          
        >
          <Tab.Screen
            name="Homepage"
            component={() => <Homepage setLogin={setisLogin}/>}
            options={{headerShown: false, tabBarLabel: '홈', unmountOnBlur: true}}
          /> 

          <Tab.Screen
            name="Chartpage"
            component={() => <Chartpage setLogin={setisLogin}/>}
            options={{headerShown: false, tabBarLabel: '차트'}}
          />

          <Tab.Screen
            name="Balancepage"
            component={() => <Balancepage setLogin={setisLogin}/>}
            options={{headerShown: false, tabBarLabel: '잔고확인'}}
          />

          <Tab.Screen
            name="Popolpage"
            component={() => <Popolpage setLogin={setisLogin}/>}
            options={{headerShown: false, tabBarLabel: '포트폴리오', unmountOnBlur: true}}
          />

          <Tab.Screen
            name="Searchpage"
            options={{headerShown: false, tabBarLabel: '검색', unmountOnBlur: true}}>
            {props => <Searchpage {...props} setLogin={setisLogin}/>}
          </Tab.Screen>
              

        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName='Firstpage'>

          <Stack.Screen
            name="Firstpage"
            options={{headerShown: false}}>
            {props => <Firstpage {...props} setLogin={setisLogin}/>}
          </Stack.Screen>
          <Stack.Screen
            name="Signuppage"
            component={() => <Signuppage setLogin={setisLogin}/>}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};



export default App;
