import React, { useLayoutEffect } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartItem from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle : props.route.params.productTitle
        });
    },[props.navigation]);


    return (
        <ScrollView>
            <Image style = { styles.image } source={{uri : selectedProduct.imageUrl}} />
            <View style = {styles.action}>
                <Button 
                    color={Colors.primary} 
                    title="Add To Cart" onPress={() => {
                        dispatch(cartItem.addToCart(selectedProduct));
                    }} />
            </View>
            <Text style = {styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style = {styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image : {
        width: '100%',
        height: 300
    },
    action: {
        marginVertical: 10,
        alignItems : 'center'
    },
    price : {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'OpenSans-Bold'
    },
    description : {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'OpenSans-Regular'
    }
});

export default ProductDetailScreen;