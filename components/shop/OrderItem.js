import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';

 
const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style = {styles.tamount}>{props.amount.toFixed(2)}</Text>
                <Text style = {styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title={showDetails ? 'Hide Details' : 'Show Details'} 
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }} 
            />
            {showDetails && (<View>
                {props.item.map(cartItem => (   //item comes from orderScreen
                    <CartItem 
                        key = {cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />
                ))}
            </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem : {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadious: 8,
        elevation : 8,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 20, 
        padding :10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent : 'space-between',
        alignItems: 'center',
        width : '100%'
    },
    date: {
        // fontFamily: 'OpenSans-Regular',
        color: '#888',
        fontSize:16
    },
    tamount: {

    }
});

export default OrderItem;