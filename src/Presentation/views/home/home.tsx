
import React, { useState, useEffect } from 'react' 
import { useNavigation } from '@react-navigation/native'; 
 
import { View, Text, Image, TextInput, StyleSheet, ToastAndroid, 
TouchableOpacity } from 'react-native' 
import { RoundedButton } from 
'../../../Presentation/components/RoundedButton'; 
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../../../App'; 
import useViewModel from './viewModel'; 
import { CustomTextInput } from '../../components/CusatomTextInput'; 
import styles from './Styles'; 
 
interface Props extends StackScreenProps<RootStackParamList, 
'HomeScreen'>{}; 
 
export const HomeScreen = ({navigation, route}: Props) => { 
 
    const { email, password, errorMessage, user,  onChange, login } = 
useViewModel(); 
 
    //const navigation = 
useNavigation<StackNavigationProp<RootStackParamList>>(); 
 
    useEffect(() => { 
        if (errorMessage !== '') { 
            ToastAndroid.show(errorMessage, ToastAndroid.LONG); 
        } 
    }, [errorMessage]); 
 
    useEffect(() => { 
        if (user?.id !== null && user?.id !== undefined) { 
            navigation.replace('ProfileInfoScreen'); 
        } 
    }, [user]); 
 
    return ( 
        <View style={styles.container}> 
            <Image 
                source={require('../../../../assets/fonfop.jpg')} 
                style={styles.imageBackground} 
            /> 
            <View style={styles.logoContainer}> 
                <Image 
                    source={require('../../../../assets/logop.jpg')} 
                    style={styles.logoImage} 
                /> 
                <Text style={styles.logoText}>PARKIANDO</Text> 
            </View> 
            <View style={styles.form}> 
                <Text style={styles.formText}>INGRESAR</Text> 
 
                <CustomTextInput 
                    image={require('../../../../assets/email.png')} 
                    placeholder='Correo electrónico' 
                    value={email} 
                    keyboardType='email-address' 
                    property='email' 
                    onChangeText={onChange} 
                /> 
 
                <CustomTextInput 
                    image={require('../../../../assets/password.png')} 
                    placeholder='Contraseña' 
                    value={password} 
                    keyboardType='default' 
                    secureTextEntry={true} 
                    property='password' 
                    onChangeText={onChange} 
                /> 
                <View style={{ marginTop: 30 }}> 
                    <RoundedButton text='ENTRAR' onPress={() => login()} /> 
                </View> 
 
                <View style={styles.formRegister}> 
                    <Text>¿No tienes cuenta?</Text> 
                    <TouchableOpacity onPress={() => 
navigation.navigate('RegisterScreen')}> 
                        <Text 
style={styles.formRegisterText}>Registrate</Text> 
                    </TouchableOpacity> 
                </View> 
 
            </View> 
 
        </View> 
    ); 
}