import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
    // availableProducts: PRODUCTS,
    // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
    availableProducts: [],
    userProducts: []
};
export default(state = initialState, action ) => {
    switch(action.type){
        case SET_PRODUCT: 
            return {
                ...state,
                availableProducts : action.products, //products from action(products) file while dispatching SET_PRODUCT
                userProducts: action.userProducts
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,// new Date().toString(), 
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl, 
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts : state.availableProducts.concat(newProduct),
                userProducts : state.userProducts.concat(newProduct)
            };

        case UPDATE_PRODUCT:
           const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
           );
            const updatedProduct = new Product(
                action.pid, 
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl, 
                action.productData.description,
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex];

            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts : updatedAvailableProducts,
                userProduct : updatedUserProducts

            };
            
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts : state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts : state.availableProducts.filter(
                    product => product.id !== action.pid
                ),
            }
    }
    
    return state;
};