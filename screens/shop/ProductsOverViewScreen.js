import React, { useLayoutEffect } from "react";
import { FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerTitle : 'All Products'
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
                        dispatch(cartActions.addToCart(itemData.item)),
                        console.log(dispatch(cartActions.addToCart(itemData.item)));
                    }}
                />
            }
        />;
};

export default ProductsOverViewScreen;