import React from "react";
import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version > 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
    <TouchableCmp onPress={props.onViewDetail} useForeground>
        <View style = {styles.product}>
            <Image source={{uri : props.image}} style ={styles.image} /> 
            <View style= {styles.detail}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style ={styles.action}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
            </View>
        </View>
    </TouchableCmp>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadious: 8,
        elevation : 8,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 300,
        margin: 20, 
        overflow: 'hidden'
    },
    image:{
        width : '100%',
        height: '59%'
    },
    detail: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'OpenSans-Bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'OpenSans-Regular'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center',
        // height: '25%',
        paddingHorizontal: 15
    }

});

export default ProductItem;