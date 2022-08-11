
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

  const [isLogin, setisLogin] = useState(false);

  return (
    <NavigationContainer>
      {isLogin ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>{
              let iconName;

              if (route.name === 'Homepage'){
                iconName = focused ? require('./src/assets/img/home_dark.png') :
                require('./src/assets/img/home.png')
              }

              if (route.name === 'Chartpage'){
                iconName = focused ? require('./src/assets/img/chart_dark.png') :
                require('./src/assets/img/chart.png')
              }

              if (route.name === 'Balancepage'){
                iconName = focused ? require('./src/assets/img/money_dark.png') :
                require('./src/assets/img/money.png')
              }

              if (route.name === 'Popolpage'){
                iconName = focused ? require('./src/assets/img/popol_dark.png') :
                require('./src/assets/img/popol.png')
              }

              if (route.name === 'Searchpage'){
                iconName = focused ? require('./src/assets/img/search_dark.png') :
                require('./src/assets/img/search.png')
              }

              return <Image source={iconName} style={{width: 25, height: 25}} />

            }

          })}
        >
          <Tab.Screen
            name="Homepage"
            component={Homepage}
            options={{title: '홈페이지'}}
          />

          <Tab.Screen
            name="Chartpage"
            component={Chartpage}
            options={{title: '차트'}}
          />

          <Tab.Screen
            name="Balancepage"
            component={Balancepage}
            options={{title: '잔고조회'}}
          />

          <Tab.Screen
            name="Popolpage"
            component={Popolpage}
            options={{title: '포트폴리오'}}
          />

          <Tab.Screen
            name="Searchpage"
            component={Searchpage}
            options={{title: '검색' }}
          />        

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
