import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';
import { thunk } from 'redux-thunk';

// SplashScreen.preventAutoHideAsync();

const rootReducer = combineReducers({
  products : productReducer,
  cart : cartReducer,
  order : orderReducer,
  auth : authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  
  // const [fontsLoaded, fontError] = useFonts({
  //   'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  //   'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  return (
    // <View style = {styles.container}>
    //   <Text>Hello</Text>
    // </View>
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
