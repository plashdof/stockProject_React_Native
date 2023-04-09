# 한이음 주식퀀트 앱

</br>

## 2022 한이음 ICT 공모전 (주식 퀀트 트레이딩 앱)

<img src ="https://user-images.githubusercontent.com/86242930/230784024-b6cea0a5-ec12-478b-a43b-97a76d07ead5.jpg" width="250" height="450"/>

</br></br>

## 개요

- 자산 자동화 관리 서비스 앱 개발
- 팀구성 : 프론트엔드 2  / 서버 2 / AI 1
- 맡은역할 :  웹/앱 개발 React.js / React Native 사용
- 개발기간 : 2022.04 ~ 2022.10 (약 6개월)

</br></br>

## 아이디어

- 근래 많은 사람들이 주식시장에 뛰어듬. → 하지만 원금 잃는경우 많음
- 이러한 사람들에게 데이터 기반의 확고한 펀더멘털과 투자전략을 제공하는 것을 목표로 하고 서비스 개발

1. **사용자 친화적 인터페이스**
- 기존 증권사/거래소 앱에서 불필요한 기능들을 대폭 제거
- 포트폴리오 관리/ 현황 조회 서비스에만 주력
- UI를 간소화하여 접근성 향상
    
    
1. **자동화된 트레이딩**
- 사용자가 신경 쓰지 않아도 미리 설정된 비율에 맞게 주기적인 리밸런싱 가능
- 리밸런싱 주기 설정 시 스케쥴러가 일정에 맞게 자동으로 조정

1. **알고리즘에 의한 투자판단**
- 사용자의 주관 개입을 막아 최대한 안전한 투자 전략 제공
- 시장 상황이 바뀌는 경우 투자판단에 대한 책임 문제는 여전히 존재
- 따라서 정교한 알고리즘 설계가 필요함

</br></br>

## 프론트 설계

</br>

### 관리

- 페이지 관리
    - 라우팅 방식이 아닌 @react-navigation을 사용하여 페이지관리. 로그인 성공한 후의 화면들은 TabNavigator로 하단탭을 만들어서 Tab방식으로 구현함. 로그인 전의 화면들은 StackNavigator로 Stack 방식으로 순차적인 페이지로 구현함.
    - 페이지 랜더링 관리는 useEffect, useState, useRef 등 훅(Hook), async await	흐름 제어를 사용하여 관리.
    
- 서버통신
    - 서버와의 통신은 주로 fetch 통신으로 획일화

- 데이터관리
    - 서버에서 받아오는 사용자 확인 데이터는 로그인 성공 시 AsyncStorage 에 저장하여, 모든 페이지에서 자유롭게 호출.
    - 앱을 종료하여도 로컬에 저장되지만 사용자가 로그아웃 버튼을 누르면, 로컬에서도 소멸하게 구현함.
    
</br>

### 화면구성

→ 홈 / 잔고확인 / 차트 / 검색 / 포트폴리오  5개의 화면으로 구성

- **로그인 페이지**
    - 전국민이 사용하는 카카오톡 기반 소셜로그인을 채택하여, 접근성 높임
    - 공식적으로 카카오API에서 RN을 지원하지 않기 때문에, 미리 구현되어있는 @react-native-seould/kakao-login 라이브러리 사용.
    
- **홈 페이지**
    - 주요 인덱스/환율 지수 한눈에 확인 가능
    - 즐겨찾기한 종목의 가격 편리하게 확인 가능
    
- **차트 페이지**
    - 가장 보편적인 캔들차트 선택
    - 최근 52주 동안의 최고/최저가 제공
    - react-native-charts-wrapper 라이브러리 사용
    
- **검색 페이지**
    - 자동완성 기능 제공

- **포트폴리오 페이지**
    - 전략 선택 → 종목 선택 → 자산규모 설정  3단계를 거쳐 자산운용이 가능함

- **잔고확인 페이지**
    - 현재 운용중인 포트폴리오 전략에 따라, 자산 현황 보여줌

</br></br>

## 프로젝트 설계

</br>

### 전체

<img src ="https://user-images.githubusercontent.com/86242930/230784027-035fbc60-09db-443f-9221-616f8a86ac75.png" width="650" height="350"/>
- Web App을 통해 여러 종목 정보, 투자 전략 정보를 GUI로 확인 가능
- 증권사와 연동을 통해 실시간 포트폴리오 정보 확인
- 클라우드 서버를 활용해 자동으로 주가정보 수집, 인공지능 학습 가능
- 자동화된 자산 리밸런싱 기능 사용 가능
- 
</br>

### 데이터 서버

<img src ="https://user-images.githubusercontent.com/86242930/230784029-bf4e439b-313e-4206-a615-c3249d03bdd4.png" width="650" height="350"/>

</br>

### 학습 서버

<img src ="https://user-images.githubusercontent.com/86242930/230784031-911d1692-8ff3-413c-a910-7e88c1a7e79f.png" width="650" height="350"/>


</br></br>

## 구동영상

---

https://user-images.githubusercontent.com/86242930/230784037-fc913134-d9e7-429d-8503-e077abbde4cf.mp4

https://user-images.githubusercontent.com/86242930/230784042-c29b61a6-18ae-422e-b6ab-cea6e3fe5f00.mp4
## 화면구성

---

</br></br>

**→ 로그인 / 회원가입 페이지**


<p align="left">

<img src ="https://user-images.githubusercontent.com/86242930/230784052-28ac7b8d-6136-4a03-a5ce-18db6972aad6.jpg" width="250" height="450"/>

<img src ="https://user-images.githubusercontent.com/86242930/230784055-799041b0-7176-42a4-94d7-caaf7d23f087.jpg" width="250" height="450"/>

</p>

</br></br>

**→ 차트 페이지**


<p align="left">

<img src ="https://user-images.githubusercontent.com/86242930/230784231-6d4bd25d-2b0a-4fbb-8ccf-bff9d0535151.jpg" width="250" height="450"/>

<img src ="https://user-images.githubusercontent.com/86242930/230784237-c56e38a9-70f6-461c-a027-6ef9b74f1d3f.jpg" width="250" height="450"/>

</p>

</br></br>

**→ 잔고확인 페이지**

<img src ="https://user-images.githubusercontent.com/86242930/230784249-b26492bb-a145-467b-a81a-4ebe7aedcdcf.jpg" width="250" height="450"/>

</br></br>

**→ 검색 페이지**


<p align="left">

<img src ="https://user-images.githubusercontent.com/86242930/230784270-fce6054a-1302-4ea3-b2ac-da032d7b7175.jpg" width="250" height="450"/>

<img src ="https://user-images.githubusercontent.com/86242930/230784273-268c67b0-fe37-4453-b9e4-11abc2529745.jpg" width="250" height="450"/>

</p>

</br></br>

**→ 포트폴리오 페이지**


<p align="left">

<img src ="https://user-images.githubusercontent.com/86242930/230784302-79a6781f-57a0-4a49-bdac-dac206162ace.jpg" width="250" height="450"/>

<img src ="https://user-images.githubusercontent.com/86242930/230784306-99610899-a6f5-476f-bb5f-889ad41cf9b9.jpg" width="250" height="450"/>

<img src ="https://user-images.githubusercontent.com/86242930/230784307-c019dab2-fb0d-422c-bab7-c4a25b2ba7b0.jpg" width="250" height="450"/>

</p>
