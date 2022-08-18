import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';

function Balance() {
  let dd = {
    state: 1,
    kakaoid: '12181577',
    nickname: 'asdfasdfasdf',
    apikey: 'PSSAea3iLDbZlD2IY8mxtlMKQaO5VsbhQJ2H',
    secret:
      'FhJBvBzeZ+/vKVLv7Lv9Oj1d4B9H9HClLbuXQ2mS+61ectcTqBmnVoxodth5jM3c/Bg78dB/sMkV/TOUgctjZYzXmTFY/TtC0G3M/lsdt++DLvhQkCdswdYtt2BBCIRmTtExcqlHRgBiRPMbSveYL905XP8ZrDe/V958uSCs67Rh/7z09Tw=',
    quantity: 7000000,
    cano: '50067576',
    acnt: '01',
    curpricedic: {'003550': 78800, '005930': 61700, '091170': 6010},
    ratio: {'005930': 0.5, '003550': 0.3, '091170': 0.2, code: 1},
    total: 500093933,
    deposit: 488107343,
    eval: 11986590,
    sumofprch: 11890765,
    sumofern: 95825,
    assticdc: 52315,
    assticdcrt: 0.01046213,
    curaccount: [
      {
        pdno: '003550',
        prdt_name: 'LG',
        hldg_qty: 54,
        pchs_avg_pric: 77464.814,
        pchs_amt: 4183100,
        prpr: 78800,
        evlu_amt: 4255200,
        evlu_pfls_amt: 72100,
        evlu_pfls_rt: 1.72,
      },
      {
        pdno: '005930',
        prdt_name: '삼성전자',
        hldg_qty: 103,
        pchs_avg_pric: 61290.291,
        pchs_amt: 6312900,
        prpr: 61700,
        evlu_amt: 6355100,
        evlu_pfls_amt: 42200,
        evlu_pfls_rt: 0.67,
      },
      {
        pdno: '091170',
        prdt_name: 'KODEX 은행',
        hldg_qty: 229,
        pchs_avg_pric: 6090.676,
        pchs_amt: 1394765,
        prpr: 6010,
        evlu_amt: 1376290,
        evlu_pfls_amt: -18475,
        evlu_pfls_rt: -1.32,
      },
    ],
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImNiMjkwMTFjLTVkYjUtNGExYi1hMTVjLTBmMGM5NDNlZDU5NSIsImlzcyI6InVub2d3IiwiZXhwIjoxNjU4OTExNjMxLCJpYXQiOjE2NTg4MjUyMzEsImp0aSI6IlBTU0FlYTNpTERiWmxEMklZOG14dGxNS1FhTzVWc2JoUUoySCJ9.kjRxVRbkC_XxTYSmfvD9THmpuPUx9uerIbxUWQP40dkyX7YT5RPFpifXAq-BT8hUNzw91Xc0IWvae0jdbNhx3Q',
    code: 1,
  };

  const [totalAssets, setTotalAssets] = useState('');
  const [manageAssets, setManageAssets] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState([]);
  const [curAccount, setCurAccount] = useState([]);
  const headerData = ['종목', '현재가', '총단가', '평단', '수량', '수익률'];
  let [uuid, Setuuid] = useState(-1);
  AsyncStorage.getItem('uuid', (err, result) => {
    Setuuid(result);
  });
  useEffect(() => {
    //     fetch(`http://haniumproject.com/getUserAccount`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         uuid: uuid,
    //       },
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         setTotalAssets(data.total);
    //         setManageAssets(data.eval + ' / ' + data.sumofprch);
    //         setRateOfReturn(parseFloat(data.assticdcrt) * 100);
    //         setCurAccount(data.curaccount);
    //       });
    setTotalAssets(dd.total);
    setManageAssets(dd.eval + ' / ' + dd.sumofprch);
    setRateOfReturn(parseFloat(dd.assticdcrt) * 100);
    setCurAccount(dd.curaccount);
  }, []);
  return (
    <>
      <DataTable style={styles.container}>
        <View
          style={{
            height: 20,
            borderBottomWidth: 1,
          }}></View>
        <DataTable.Row>
          <DataTable.Cell>총자산(원)</DataTable.Cell>
          <DataTable.Cell>{totalAssets}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>운용중인 자산(원)</DataTable.Cell>
          <DataTable.Cell>{manageAssets}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>수익률</DataTable.Cell>
          <DataTable.Cell>{rateOfReturn} %</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <DataTable style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
          }}>
          상세자산정보
        </Text>
        <DataTable.Header style={styles.tableHeader}>
          {headerData.map(item => {
            return <DataTable.Title>{item}</DataTable.Title>;
          })}
        </DataTable.Header>
        {curAccount.map(item => {
          return (
            <DataTable.Row key={item.prdt_name}>
              <DataTable.Cell>{item.prdt_name}</DataTable.Cell>
              <DataTable.Cell>{item.prpr}</DataTable.Cell>
              <DataTable.Cell>{item.evlu_amt}</DataTable.Cell>
              <DataTable.Cell>{item.pchs_avg_pric}</DataTable.Cell>
              <DataTable.Cell>{item.hldg_qty}</DataTable.Cell>
              <DataTable.Cell>
                {item.evlu_pfls_rt < 0 ? (
                  <Text style={{color: 'blue'}}>{item.evlu_pfls_rt}</Text>
                ) : (
                  <Text style={{color: 'red'}}>{item.evlu_pfls_rt}</Text>
                )}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </>
  );
}
export default Balance;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
  },
  tableHeader: {
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
  },
});
