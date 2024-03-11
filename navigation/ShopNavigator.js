import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';;
import Colors from '../constants/Colors';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

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

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserProducts' component={UserProductScreen} />
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
        <Drawer.Screen 
          name = "Shops" 
          component = {ProductsNavigator} 
          options={{
            headerShown : false,
            drawerIcon : drawerConfig => (
              <AntDesign  
                name="shoppingcart" 
                size={23} 
                color= {drawerConfig.drawerActiveTintColor}
              />
            )
          }}
        />
        <Drawer.Screen name = "Order" component = {OrdersNavigator} options={{headerShown : false}}/>
        <Drawer.Screen name = "Admin" component = {AdminNavigator} options={{headerShown : false}}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default ShopsNavigator;