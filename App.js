import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import MapScreen from './screens/MapScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Navigator() {
  let IconComponent = Ionicons;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="ios-filing" size={25} />
          ),
        }}/>
      <Tab.Screen name="Camera" component={CameraScreen} options={{
          tabBarLabel: 'Câmera',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="ios-camera" size={25} />
          ),
        }}/>
      <Tab.Screen name="QRCode" component={QRCodeScreen} options={{
          tabBarLabel: 'QR Code',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="ios-code" size={25} />
          ),
        }}/>
      <Tab.Screen name="Map" component={MapScreen} options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <IconComponent name="ios-map" size={25} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Navigator />
    </NavigationContainer>
  );
}