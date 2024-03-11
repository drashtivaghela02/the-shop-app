import React, { useLayoutEffect } from "react";
import { Button, FlatList, Platform, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign, Ionicons } from '@expo/vector-icons';

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
          productId: id,
          productTitle: title
        });
      };
    
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
                    onSelect ={()=> {
                        selectItemHandler(itemData.item.id,itemData.item.title);
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        title="View Details" 
                        onPress={() => {
                            selectItemHandler(itemData.item.id,itemData.item.title)
                        }} />
                    <Button 
                        color={Colors.primary} 
                        title="To Cart" 
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }} />
                </ProductItem>
            }
        />;
};

export default ProductsOverViewScreen;