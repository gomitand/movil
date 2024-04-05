import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';



export const ReservaScreen: React.FC = () => {
  const [placa, setPlaca] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [horaReserva, setHoraReserva] = useState('');
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const handleReservar = () => {
    const reservaData = {
      placa,
      tipoVehiculo,
      horaReserva
    };

    fetch('http://192.168.0.17:3000/api/reservas', { // Verifica la URL y la ruta del backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    })
    .then(response => {
      if (response.ok) {
        setReservaExitosa(true);
        alert('Reserva realizada correctamente');
      } else {
        alert('Error al realizar la reserva');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al realizar la reserva');
    });
  };

  
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/logop.jpg')}
        style={styles.logoImage}
      />


<ImageBackground
  source={require('../../../../assets/fonfop.jpg')}
  
  
/>


      <View style={styles.content}>
        <Text style={styles.title}>Formulario de Reserva</Text>
        <TextInput
          style={styles.input}
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de vehículo (Carro/Moto)"
          value={tipoVehiculo}
          onChangeText={setTipoVehiculo}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora de la reserva"
          value={horaReserva}
          onChangeText={setHoraReserva}
        />
        <Button
          onPress={handleReservar}
          title="Reservar"
        />
        {reservaExitosa && <Text style={[styles.successMessage, { fontWeight: 'bold', fontSize: 18 }]}>Reserva realizada correctamente</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A768EE',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    padding: 8,
    width: 300,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  successMessage: {
    marginTop: 100,
    color: '#FEFDFF',
  },
 
});
