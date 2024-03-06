import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
        screenOptions = {{
            headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'},
            headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
            headerTitleStyle: { fontWeight: 'bold', },  
        }}
    >
      <Stack.Screen name="ProductsOverView" component={ProductsOverViewScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProductsNavigator;