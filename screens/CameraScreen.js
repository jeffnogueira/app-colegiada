import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Container, Content } from 'native-base';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const snap = async () => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync();
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
                    <Camera style={{ flex: 1, height: 550 }} type={type} ref={ref => this.camera = ref }>
                        <View style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            }}>
                            <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                                onPress={() => { setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Tirar Foto </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>

                    <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                        onPress={() => { setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Trocar Camera </Text>
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>
    );
}