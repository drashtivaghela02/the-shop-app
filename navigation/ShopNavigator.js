import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
      >
        <Stack.Screen name="ProductsOverView" component={ProductsOverViewScreen} />
        <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProductsNavigator;