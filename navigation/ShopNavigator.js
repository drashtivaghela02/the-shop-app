import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import Colors from '../constants/Colors';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => {
  return (
      <Stack.Navigator
          screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
      >
        <Stack.Screen name="ProductsOverView" component={ProductsOverViewScreen} />
        <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
        <Stack.Screen name='Cart' component={CartScreen} />
      </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Orders' component={OrderScreen} />
    </Stack.Navigator>
  );
};

const ShopsNavigator = () => {
  return(
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor : Colors.primary,
          drawerLabelStyle : {
              fontWeight: 'bold'
          }
        }}
      >
        <Drawer.Screen name = "Shops" component = {ProductsNavigator} options={{headerShown : false}}/>
        <Drawer.Screen name = "Orders" component = {OrdersNavigator} options={{headerShown : false}}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopsNavigator;