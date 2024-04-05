import React from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';

// Coordenadas de algunos parqueaderos en Usme (ejemplo)
const parqueaderosUsme = [
    { latitude: 4.5101, longitude: -74.1307 },
    { latitude: 4.5108, longitude: -74.1315 },
    { latitude: 4.5115, longitude: -74.1289 },
    // Agrega más coordenadas si es necesario
];

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> { };

export const ProfileInfoScreen: React.FC<Props> = ({ navigation, route }) => {
    const { removeSession } = useViewModel();

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 4.5139,
                    longitude: -74.1292,
                    latitudeDelta: 0.02, // Ajusta el zoom del mapa según sea necesario
                    longitudeDelta: 0.02,
                }}
            >
                {/* Marcadores para los parqueaderos */}
                {parqueaderosUsme.map((parqueadero, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: parqueadero.latitude, longitude: parqueadero.longitude }}
                        title={`Parqueadero ${index + 1}`}
                    />
                ))}
            </MapView>
            <Text style={{ textAlign: 'center' }}>Parking disponibles</Text>
            {/* Botón para reservar */}
            <Button
                onPress={() => {
                    removeSession();
                    navigation.navigate('ReservaScreen'); // Navega a la pantalla de reserva
                }}
                title="Reservar"
            />
            {/* Botón para cerrar sesión */}
            <Button
                onPress={() => {
                    removeSession();
                    navigation.navigate('HomeScreen');
                }}
                title="Cerrar Sesión"
            />
        </View>
    );
};