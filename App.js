import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import productReducer from './store/reducers/products';
import ProductsNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';

// SplashScreen.preventAutoHideAsync();

const rootReducer = combineReducers({
  products : productReducer,
  cart : cartReducer
});

const store = createStore(rootReducer);

export default function App() {
  
  const [fontsLoaded, fontError] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
  });

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
      <ProductsNavigator />
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
