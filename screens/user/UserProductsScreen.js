import React, { useLayoutEffect } from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from '../../constants/Colors';

const UserProductScreen = props => {
    const userProduct = useSelector(state => state.products.userProducts);

    useLayoutEffect(()=> {
        props.navigation.setOptions({
            headerTitle : 'Your Products',
            headerLeft : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Ionicons name="menu" size={24} color='black' style = {{marginLeft: 15}} onPress={()=> props.navigation.toggleDrawer()} />
                    </HeaderButtons>
                );
            },
        });
    },[props.navigation]);
    

    return (
    <FlatList 
        data={userProduct} 
        keyExtractor={item => item.id} 
        renderItem={itemData => (
            <ProductItem 
                image = {itemData.item.imageUrl} 
                title = {itemData.item.title} 
                price = {itemData.item.price}
                onSelect={() => {}}
            >
                <Button color={Colors.primary} title="Edit" onPress={() => {}} />
                <Button
                  color={Colors.primary}
                  title="Delete"
                  onPress={() => {}}
                />
            </ProductItem>
        )} 
    />);
};

export default UserProductScreen;