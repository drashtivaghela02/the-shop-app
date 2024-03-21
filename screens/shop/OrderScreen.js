import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View , FlatList, Text, Button, ActivityIndicator} from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as OrdersAction from "../../store/actions/order";
import Colors from "../../constants/Colors";


const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orderscr = useSelector(state => state.order.orders);  // order (from App.js)  orders(from reducer)
    console.log("Orders: ",orderscr)
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     setIsLoading(true);
    //     dispatch(OrdersAction.fetchOrders()).then(() => {
    //         setIsLoading(false);
    //     });
    // },[dispatch]);


//     if(isLoading){
//         return (
//             <View style = {styles.centered}>
//                 <ActivityIndicator size="large" color={Colors.primary} />
//             </View>
//         );
//     }
// if(!isLoading){
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle : 'Your Orders',
            headerLeft : () => {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Ionicons name="menu" size={24} color='white' style = {{marginLeft: 15}} onPress={()=> props.navigation.toggleDrawer()} />
                    </HeaderButtons>
                );
            },
        });
    },[props.navigation]);
// }


    useEffect(() => {
        setIsLoading(true);
        dispatch(OrdersAction.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    },[dispatch]);


    if(isLoading){
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
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

const styles = StyleSheet.create({
    centered : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrderScreen;