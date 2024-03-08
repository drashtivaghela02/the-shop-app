import React, { useLayoutEffect } from "react";
import { FlatList, Platform, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign, Ionicons } from '@expo/vector-icons';

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import HeaderButton from "../../components/UI/HeaderButton"

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerTitle : 'All Products',
            headerLeft : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Ionicons name="menu" size={24} color='white' style = {{marginLeft: 15}} onPress={()=> props.navigation.toggleDrawer()} />
                    </HeaderButtons>
                );
            },
            headerRight : () =>  {
                return (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <AntDesign name="shoppingcart" size={24} color="white" onPress={() => {props.navigation.navigate('Cart')}} />
                </HeaderButtons>
                );
            }
        });
    },[props.navigation]);
    
    return <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image = {itemData.item.imageUrl} 
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onViewDetail = {() => {
                        props.navigation.navigate('ProductDetail', {
                            productId : itemData.item.id,
                            productTitle: itemData.item.title
                        });
                    }}
                    onAddToCart = {() => {
                        dispatch(cartActions.addToCart(itemData.item))
                        // console.log(dispatch(cartActions.addToCart(itemData.item)));
                    }}
                />
            }
        />;
};

export default ProductsOverViewScreen;