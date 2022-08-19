import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';

function Balance() {
  const [loading, setLoading] = useState(true);
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
    fetch(`http://haniumproject.com/getUserAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        uuid: uuid,
      },
    })
      .then(response => response.json())
      .then(data => {
        setTotalAssets(data.total);
        setManageAssets(data.eval + ' / ' + data.sumofprch);
        setRateOfReturn(parseFloat(data.assticdcrt) * 100);
        setCurAccount(data.curaccount);
        setLoading(false);
      });
  });
  return (
    <>
      {loading ? (
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
            {curAccount !== undefined &&
              curAccount.map(item => {
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
      ) : (
        <></>
      )}
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
