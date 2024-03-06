import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import productReducer from './store/reducers/products';
import ProductsNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products : productReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
