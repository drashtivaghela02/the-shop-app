import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View , FlatList, Text} from "react-native";
import { HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    
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
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
     );
};

const styles = StyleSheet.create({});

export default OrderScreen;