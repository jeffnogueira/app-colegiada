import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Container, Content } from 'native-base';
import * as MailComposer from 'expo-mail-composer';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null)
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const takePicture = async () => {
      if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
        const options = {
            subject: 'Teste Envio Email com Anexo',
            attachments: [photo.uri]
        }
        MailComposer.composeAsync(options)

      }
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
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, height: 500 }} type={type} ref={ref => { setCameraRef(ref) } } >
                        <View style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            }}>
                            <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center', paddingBottom: 15 }}
                                onPress={() => takePicture() }>
                                <View style={{ borderWidth: 2, borderRadius:50, borderColor: 'white', height: 50,
                                    width:50, display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                    <View style={{ borderWidth: 2, borderRadius:50, borderColor: 'white',
                                        height: 40, width:40, backgroundColor: 'white'}} >
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Camera>

                    <TouchableOpacity style={{ flex: 0.1, alignSelf: 'center', paddingTop: 45, alignItems: 'center' }}
                        onPress={() => { setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}> Trocar Camera </Text>
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>
    );
}