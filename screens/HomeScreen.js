import React from 'react';
import { Text, View } from 'react-native';
import { Container, Content } from 'native-base';

export default function HomeScreen() {
  
    return (
        <Container style={{marginTop: 23}}>
            <Content>
                <View style={{ flex: 1 }}>
                    <Text>APP COLEGIADA</Text>
                </View>
            </Content>
        </Container>
    );
}