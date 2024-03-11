import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text> 
                <Text style = {styles.mainText} >{props.title} </Text>
            </View>
            <View style={styles.itemData}>
                <Text style = {styles.amount}>{props.amount.toFixed(2)}</Text>
                { props.deletable && (
                    <TouchableOpacity onPress={props.onRemove} style = {styles.deleteButton}>
                        <Ionicons name="trash" size={23} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem : {
        padding : 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        // fontFamily: 'OpenSans-Regular',
        color: '#888',
        fontSize:16
    },
    mainText: {
        // fontFamily: 'OpenSans-Bold',
        fontSize:16
    },
    amount: {
        // fontFamily: 'OpenSans-Bold',
        fontSize:16
    },
    deleteButton: {
        margin: 15,

    }
});

export default CartItem;