import React from "react";
import { Button, StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state =>  state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId : key,
                productTitle : state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity : state.cart.items[key].quantity,
                sum : state.cart.items[key].sum 
            });
        }
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();
    
    return (
        <View style = {styles.screen}>
            <View style = {styles.summary} >
                <Text style = {styles.summaryText} >
                    Total: <Text style = {styles.amount} >${cartTotalAmount.toFixed(2)}</Text> 
                </Text>
                <Button color={Colors.accent} title="Order Now" onPress={dispatch(orderActions.addOrder(cartItems, cartTotalAmount))} disabled={cartItems.length === 0} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => ( 
                <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}}
                />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        margin: 20
    },
    summary : {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : 20,
        padding: 10, 
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadious: 8,
        elevation : 8,
        borderRadius: 15,
        backgroundColor: 'white'

    },
    summaryText : {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;