import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View , FlatList, Text} from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";


const OrderScreen = props => {
    const orderscr = useSelector(state => state.order.orders);  // order (from App.js)  orders(from reducer)
    console.log(orderscr)
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle : 'Your Orders',
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
            data={orderscr}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <OrderItem 
                    amount={itemData.item.TotalAmount} 
                    date={itemData.item.readableDate} 
                    item={itemData.item.items}
                />
            }
        />
     );
};

const styles = StyleSheet.create({});

export default OrderScreen;