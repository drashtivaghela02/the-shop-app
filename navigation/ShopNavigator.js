import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import ProductsOverViewScreen from '../screens/shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductsScreen';;
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const ProductStack = createStackNavigator();
const ProductsNavigator = () => {
  return (
      <ProductStack.Navigator
          screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
      >
        <ProductStack.Screen name="ProductsOverView" component={ProductsOverViewScreen} />
        <ProductStack.Screen name='ProductDetail' component={ProductDetailScreen} />
        <ProductStack.Screen name='Cart' component={CartScreen} />
      </ProductStack.Navigator>
  );
};


const OrderStack = createStackNavigator();
const OrdersNavigator = () => {
  return (
    <OrderStack.Navigator
      screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
    >
      <OrderStack.Screen name='Orders' component={OrderScreen} />
    </OrderStack.Navigator>
  );
};


const AdminStack = createStackNavigator();
const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
    >
      <AdminStack.Screen name='UserProducts' component={UserProductScreen} />
      <AdminStack.Screen name='EditProducts' component={EditProductScreen} />
    </AdminStack.Navigator>
  );
};


const ShopDrawer = createDrawerNavigator();
export const ShopsNavigator = () => {
  const dispatch = useDispatch();
  return(
    // <NavigationContainer>
      <ShopDrawer.Navigator
        screenOptions={{
          drawerActiveTintColor : Colors.primary,
          drawerLabelStyle : {fontWeight: 'bold'}
        }}
        drawerContent={props => {
          return (
            <View style={{ flex: 1, paddingTop: 35, paddingHorizontal:10 }}>
              <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItemList {...props} />
                <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('Auth');
                  }}
                />
              </SafeAreaView>
            </View>
          );
        }}
  
      >
        <ShopDrawer.Screen 
          name = "Shops" 
          component = {ProductsNavigator} 
          options={{
            headerShown : false,
            drawerIcon : (focused,color) => (
              <AntDesign  
                name="shoppingcart" 
                size={23}
                color={focused.focused ? Colors.primary : color}
              />
            )
          }}
        />

        <ShopDrawer.Screen 
          name = "Order" 
          component = {OrdersNavigator}
          options={{
            headerShown : false,
            drawerIcon : (focused, color) => (
              <Ionicons  
                name="list-sharp" 
                size={23}
                color={focused.focused ? Colors.primary : color}
              />
              )
          }}
        />
        
        <ShopDrawer.Screen 
          name = "Admin" 
          component = {AdminNavigator} 
          options={{
            headerShown : false,
            drawerIcon : (focused,color) => (
              <Ionicons
                name="create-sharp" 
                size={23}
                color={focused.focused ? Colors.primary : color}
              />)
          }} 
        />

      </ShopDrawer.Navigator>
    // </NavigationContainer>
  );
};

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
    <AuthStack.Navigator
      screenOptions = {{
              headerStyle : {backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'},
              headerTintColor: Platform.OS === 'android'  ? 'white' : Colors.primaryColor,
              headerTitleStyle: { fontWeight: 'bold' }
          }}
    >
      <AuthStack.Screen name="Startup" component={StartupScreen} />
      <AuthStack.Screen name="Auth" component={AuthScreen} />
      <AuthStack.Screen name="Shop" component={ShopsNavigator} options = {{headerShown: false}} />
      
    </AuthStack.Navigator>
    </NavigationContainer>
  ); 
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Shop" component={ShopsNavigator} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;