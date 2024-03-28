import React, { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authAction from '../../store/actions/auth';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        // console.log("form valid: ",updatedFormIsValid);
        // console.log("updated validities ", updatedValidities);
        // console.log("updated value ",updatedValues );

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
        },
        inputValidities: {
          email: false,
          password: false,
        },
        formIsValid: false
      });

    useEffect(() => {
        if(error) {
            Alert.alert('An Error Ocurred', error, [{text : 'Okay'}]);
        }
    }, [error]);

    const authHandler = async () => {
        // console.log("email",formState.inputValues.email)
        let action;
        if(isSignup){ //if isSignup is true then signup else login
            action = authAction.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        else{
            action = authAction.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err){
            setError(err.message);
        }
        setIsLoading(false);
    };

    const inputChangeHandler = useCallback((inputIdentifier, inputValues, inputValidity) => {
        // console.log("testing",inputValues)
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value : inputValues,
            isValid : inputValidity,
            input : inputIdentifier
        })
    },[dispatchFormState]);
    

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle : 'Please Authenticate'
        })
    },[props.navigation]);

    return (
        <KeyboardAvoidingView 
            behavior='padding' 
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe2ff']} style={styles.gradient} >
                <View style={styles.cardAuthContainer} >
                    <ScrollView>
                        <Input
                            id = 'email'
                            label ="E-mail"
                            errorText = "In-valid email"
                            keyboardType = 'email-address'
                            required
                            email
                            autoCapitalize ='none'
                            errorMessage="Please enter a valid email address"
                            onInputChange= {inputChangeHandler.bind(this, 'email')}
                            initialValue=""
                        />
                        <Input
                            id = 'password'
                            label ="Password"
                            errorText = "in valid password"
                            keyboardType = 'default'
                            secureTextEntry
                            required
                            minLength ={5}
                            autoCapitalize ='none'
                            errorMessage="Please enter a valid password"
                            onInputChange= {inputChangeHandler.bind(this, 'password')}
                            initialValue=""
                        />
                        <View style ={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.primary} /> 
                            ):(
                                <Button 
                                    title={isSignup ? 'Sign Up' :'Login' }
                                    color={Colors.primary} 
                                    onPress={authHandler} 
                                />
                            )}
                        </View>
                        <View style ={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent} 
                                onPress={()=>{
                                    setIsSignup(prevState => !prevState);
                                }} 
                            />
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex : 1,
    },
    gradient: {
        width : '100%',
        height : '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardAuthContainer: {
        //container style
        width : '80%',
        maxWidth: 400,
        maxHeight : 400,
        padding: 20,
        //Card styles
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    buttonContainer : {
        margin : 10
    }
});

export default AuthScreen;