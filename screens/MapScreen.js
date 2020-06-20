import React, { useState, useEffect } from 'react';
import { Container, Content } from 'native-base';
import { Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

export default function MapScreen() {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyApIKEsfsFL1vtSGJXui7L1KrlNW4sBM7U';

    const [latitudeOrigin, setLatitudeOrigin] = useState(0);
    const [longitudeOrigin, setlongitudeOrigin] = useState(0);
    const [latitudeDestiny, setLatitudeDestiny] = useState(-18.5744505);
    const [longitudeDestiny, setlongitudeDestiny] = useState(-46.5158895);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        getCoord();
    });

    const getCoord = () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            setHasPermission(status === 'granted');
    
            let location = await Location.getCurrentPositionAsync({});
            setLatitudeOrigin(location.coords.latitude);
            setlongitudeOrigin(location.coords.longitude);
        })();
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
                <Text>Sem acesso a Localização</Text>
                <Button title={'Clique para Localizar'} onPress={() => getCoord()} 
                    style={{ width: 50, height: 25 }}/>
            </Content>
        </Container>;
    }
  
    return <Container style={{marginTop: 23}}>
                <Content>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                        <MapView style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/3*2}} 
                            region={{
                                latitude: (latitudeOrigin + latitudeDestiny) / 2,
                                longitude: (longitudeOrigin + longitudeDestiny) / 2,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0922 + (Dimensions.get('window').width / Dimensions.get('window').height),
                            }}
                    
                            loadingEnabled={true}
                            toolbarEnabled={true}
                            zoomControlEnabled={true}
                            rotateEnabled={false}
                            minZoomLevel={15}
                            maxZoomLevel={20}>
                            
                            <MapView.Marker coordinate={{latitude: latitudeDestiny, longitude: longitudeDestiny}} />

                            <MapView.Marker coordinate={{latitude: latitudeOrigin, longitude: longitudeOrigin}} />

                            <MapViewDirections origin={{latitude: latitudeOrigin, longitude: longitudeOrigin}}
                                destination={{latitude: latitudeDestiny, longitude: longitudeDestiny}}
                                apikey={GOOGLE_MAPS_APIKEY} />

                                
                        </MapView>

                        <Button title={'Clique para Localizar'} onPress={() => getCoord()} 
                            style={{ width: 50, height: 25 }}/>
                        <Text>Coordenadas: { latitudeOrigin }, { longitudeOrigin }</Text>
                    </View>
                </Content>
        </Container>;
}