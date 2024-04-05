import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para React Native

import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const HomeViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const { user, getUserSession } = useUserLocal();

    useEffect(() => {
        getUserSession();
    }, []);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('Respuesta: ' + JSON.stringify(response));
            if (!response.success) {
                setErrorMessage(response.message);
            } else {
                await SaveUserLocalUseCase(response.data);
                getUserSession();
            }
        }
    };

    const isValidForm = () => {
        if (values.email === '') {
            setErrorMessage('El email es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }

        return true;
    };

    const removeSession = async () => {
        try {
        
            await AsyncStorage.removeItem('userToken');

           
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
           
        }
    };

    return {
        ...values,
        user,
        onChange,
        login,
        removeSession,
        errorMessage
    };
};

export default HomeViewModel;