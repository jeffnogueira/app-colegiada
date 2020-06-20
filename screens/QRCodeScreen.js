import React, { useState, useEffect } from 'react';
import { Container, Content } from 'native-base';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [dataScanned, setDataScanned] = useState('');
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setDataScanned(data);
    };
  
    if (hasPermission === null) {
      return <Container style={{marginTop: 23}}>
            <Content>
                <View />
            </Content>
        </Container>;
    }
    if (hasPermission === false) {
      return <Container style={{marginTop: 23}}>
            <Content>
                <Text>Sem acesso a camera</Text>
            </Content>
        </Container>;
    }
    return (
        <Container style={{marginTop: 23}}>
            <Content>
                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject,{height: 500}}
                    />

                    <Button title={'Clique para scannear'} onPress={() => setScanned(false)} 
                        style={{ width: 50, height: 25 }}/>
                    <Text>Texto: { dataScanned }</Text>
                </View>
            </Content>
        </Container>
    );
}