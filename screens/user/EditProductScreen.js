import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { HeaderButtons } from 'react-navigation-header-buttons';

import HeaderButton from "../../components/UI/HeaderButton"
import * as productsActions from '../../store/actions/products'
import { useDispatch, useSelector } from 'react-redux';

const EditProductScreen = props => {
    const prodId = props.route.params ? props.route.params.productId : null;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const [textIsValid, setTextIsValid] = useState(false);

    const submitHandler = useCallback(() => {
        if (textIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
              { text: 'Okay' }
            ]);
            return;
          }      
        if(editedProduct){
            dispatch(productsActions.updateProduct(prodId, title, description,imageURL));
        }
        else{
            dispatch(productsActions.createProduct(title,description,imageURL,+price));
        }
        props.navigation.goBack();
    },[dispatch,prodId,title,description,imageURL,price, textIsValid]);

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
    
    const textChangeHandler = text => {
        setTitle(text);
        if(text.trim().length !== 0){
            setTextIsValid(false);
        }
        else{
            setTextIsValid(true);
        }
    }

    return (
        <ScrollView>
            <View style = {styles.form}>
                <View style = {styles.formControl}>
                    <Text style = {styles.label} >Title</Text>
                    <TextInput 
                        style = {styles.input} 
                        value={title} 
                        onChangeText={textChangeHandler}
                        keyboardType ='default'
                        autoCapitalize='sentences'  
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!textIsValid ? <Text>Please Enter a Valid Title!</Text> : null}
                </View>

                <View style = {styles.formControl}>
                    <Text style = {styles.label} >ImageURL</Text>
                    <TextInput 
                        style = {styles.input} 
                        value={imageURL}
                        onChangeText={text => setImageURL(text)} 
                    />
                </View>

                {editedProduct ? null : <View style = {styles.formControl}>
                    <Text style = {styles.label} >Price</Text>
                    <TextInput 
                        style = {styles.input} 
                        value={price}
                        onChangeText={text => setPrice(text)}
                        keyboardType='decimal-pad'
                     />
                </View>}

                <View style = {styles.formControl}>
                    <Text style = {styles.label} >Description</Text>
                    <TextInput 
                        style = {styles.input} 
                        value={description}
                        onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin : 20
    },
    formControl: {
        width : '100%'
    },
    label: {
        // fontFamily: "OpenSams-Bold",
        marginVertical: 8
    },
    input : {
        paddingHorizontal : 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;