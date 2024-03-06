import React, { useLayoutEffect } from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerTitle : 'All Products'
        });
    })

    return <FlatList 
            data={products} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image = {itemData.item.imageUrl} 
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onViewDetail = {() => {}}
                    onAddToCart = {() => {}}
                />}
        />;
};

export default ProductsOverViewScreen;