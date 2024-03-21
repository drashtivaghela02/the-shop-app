import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AntDesign, Ionicons } from '@expo/vector-icons';

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products'
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from "../../constants/Colors";

const ProductsOverViewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRefreshing, setIsRefresing] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    
    const loadProduct = useCallback(async () => {
        setError(null);
        setIsRefresing(true);
        try {
            await dispatch(productsActions.fetchData());
        } catch (err){
            setError(err.message)
        }
        setIsRefresing(false);
    },[dispatch, setIsLoading, setError]); 
    
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('focus',loadProduct);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProduct]);


    useEffect(() => {
        setIsLoading(true);
        loadProduct().then(() => {
            setIsLoading(false);
        })
    },[dispatch,loadProduct])
    
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
    
    if(error){
        return (
            <View style = {styles.centered}>
                <Text>An Error Occured!</Text>
                <Button title="Try Again!" onPress={loadProduct} color={Colors.primary} /> 
            </View>
        );
    }

    if(isLoading){
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if(!isLoading && products.length === 0){
        return (
            <View style = {styles.centered}>
                <Text>No Products Found. Maybe start adding some!</Text>
            </View>
        );
    }

    return <FlatList 
            onRefresh={loadProduct}
            refreshing={isRefreshing}
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

const styles =StyleSheet.create({
    centered : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverViewScreen;