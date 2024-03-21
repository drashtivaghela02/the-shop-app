import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Alert, ActivityIndicator, Button } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import HeaderButton from "../../components/UI/HeaderButton"
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'; 
import { useDispatch, useSelector } from 'react-redux';
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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // console.log("props",props.route.params)
    const prodId = props.route.params ? props.route.params.productId : null;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities: {
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
      });
    
    useEffect(() => {
        if(error){
            Alert.alert('An error occured!', error,[{ text : 'Okay'}])
        }
    },[error])

    const submitHandler = useCallback(async() => {
        // if (textIsValid) {
        if(!formState.formIsValid){
            setError('Please check the errors in the form.');
            // Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            //     { text: 'Okay' }
            // ]);
            return;
        }
        setError(null)
        setIsLoading(true);
        try {
            if(editedProduct){      //while editing product
                await dispatch(productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    formState.inputValues.imageUrl));
                }
    
            else{ // while add product
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price));
                    // console.log("Errormeassge3",formState.inputValues );
            }
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false);
        
        if(formState.formIsValid){
            props.navigation.goBack();
        } 
    },[dispatch,prodId,formState,editedProduct,props.navigation]);

    const inputChangeHandler = useCallback((inputIdentifiers, inputValues, inputValidity) => {
        // console.log("testing",inputValues)
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value : inputValues,
            isValid : inputValidity,
            input : inputIdentifiers
        })
    },[dispatchFormState]);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            // headerTitle : props.route.params.productId ? 'Edit Product': 'Add Product',
            headerTitle : prodId ? 'Edit Product': 'Add Product',
            headerRight : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton} >
                        <Ionicons 
                            name="checkmark" 
                            size={24} 
                            color='white' 
                            // style = {{marginLeft: 15}} 
                            onPress={submitHandler} />
                    </HeaderButtons>
                );
            }
        });
    }, [props.navigation, submitHandler]);
    
    if(isLoading){
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    
    return (
        <ScrollView>
            <View style = {styles.form}>
                <Input
                    label = 'Title'
                    errorText = "Please Enter a Valid Title!"
                    keyboardType ='default'
                    autoCapitalize='sentences'  
                    autoCorrect
                    returnKeyType='next'
                    onInputChange = {inputChangeHandler.bind(this,'title')
                        // (test,data)=>console.log("test",test,data)
                    }
                    initialValue = {editedProduct ? editedProduct.title : ''}
                    intaillyValid = { editedProduct } 
                    required
                />

                <Input
                    label = 'ImageUrl'
                    errorText = "Please Enter a Valid ImageUrl!"
                    keyboardType ='default'
                    returnKeyType='next'
                    initialValue = {editedProduct ? editedProduct.imageUrl : ''}
                    intaillyValid = {editedProduct } 
                    required
                    onInputChange = {inputChangeHandler.bind(this,'imageUrl')}
                />

                {editedProduct ? null : (<Input
                    label = 'Price'
                    errorText = "Please Enter a Valid Price!"
                    keyboardType ='decimal-pad'
                    returnKeyType='next'
                    required
                    min = {0.1}
                    onInputChange = {inputChangeHandler.bind(this,'price')}
                />
                )}

                <Input
                    label = 'Description'
                    errorText = "Please Enter a Valid Description!"
                    keyboardType ='default'
                    autoCapitalize= 'sentences'
                    autoCorrect
                    multiline
                    numberOfLine = {3}
                    initialValue = {editedProduct ? editedProduct.description : ''}
                    intaillyValid = { editedProduct } 
                    required
                    minLength= {5}
                    onInputChange = {inputChangeHandler.bind(this,'description')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin : 20
    },
    centered : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});

export default EditProductScreen;