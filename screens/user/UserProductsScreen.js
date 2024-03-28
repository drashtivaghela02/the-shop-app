import React, { useLayoutEffect } from 'react';
import { Alert, Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from '../../constants/Colors';
import * as ProductActions from '../../store/actions/products';

const UserProductScreen = props => {
    const userProduct = useSelector(state => state.products.userProducts);
    console.log("user Products :",userProduct);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts', {productId : id})
    };

    const deleteHandler = (id) =>{
        Alert.alert('Are you sure?','Do you really want to delete this item?',[
            {text : 'NO', style: 'default'},
            {text: 'YES', style: 'destructive', onPress: () => {dispatch(ProductActions.deleteProduct(id));}}
        ]);
    }

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerTitle : 'Your Products',
            headerLeft : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Ionicons 
                            name="menu" 
                            size={24} 
                            color='white' 
                            style = {{marginLeft: 15}} 
                            onPress={() => props.navigation.toggleDrawer()} />
                    </HeaderButtons>
                );
            },
            headerRight : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Ionicons 
                            name="add" 
                            size={24} 
                            color='white' 
                            // style = {{marginLeft: 15}} 
                            onPress={() => {props.navigation.navigate('EditProducts')}} />
                    </HeaderButtons>
                );
            }
        });
    },[props.navigation]);
    
    if(userProduct.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No Products found, maybe start creating some?</Text>
            </View>
        );
    }

    return (
    <FlatList 
        data={userProduct} 
        keyExtractor={item => item.id} 
        renderItem={itemData => (
            <ProductItem 
                image = {itemData.item.imageUrl} 
                title = {itemData.item.title} 
                price = {itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id);
                }}
            >
                <Button 
                    color={Colors.primary} 
                    title="Edit" 
                    onPress={() => {
                        editProductHandler(itemData.item.id)  //,console.log(itemData.item.id)
                    }} 
                />
                <Button
                  color={Colors.primary}
                  title="Delete"
                  onPress={deleteHandler.bind(this, itemData.item.id)}
                />
            </ProductItem>
        )} 
    />
    );
};

export default UserProductScreen;