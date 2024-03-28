import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT'

export const fetchData = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch("https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product.json");

            if(!response.ok){
                throw new Error("Something Went wrong!!")
            }
            const resData = await response.json();
            // console.log(resData)
            const loadedProduct = [];
            for(const key in resData){
                loadedProduct.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
            dispatch({
                type: SET_PRODUCT, 
                products : loadedProduct,
                userProducts : loadedProduct.filter(prod => prod.ownerId === userId)
            });
        } catch(err){
            //send custom analytics server
            throw err
        
        } 
    }
};


export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;

        const response = await fetch(`https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product/${productId}.json?auth=${token}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({type : DELETE_PRODUCT, pid : productId})
    }
};

export const createProduct = (title, description, imageUrl, price) => {

    return async (dispatch, getState) => { 
        // add any async code you want!
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product.json?auth=${token}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                title, 
                description, 
                imageUrl, 
                price,
                ownerId : userId
            })
        });

        const resData = await response.json();
        console.log(resData)

        dispatch({
            type : CREATE_PRODUCT, 
            productData : {id : resData.name,  title, description, imageUrl, price, ownerId : userId}
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch( `https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({id, title, description, imageUrl})
        });

        if(!response.ok){
            throw new Error("Something Went wrong!!")
        }
    
        dispatch ({
            type : UPDATE_PRODUCT, 
            pid: id,
            productData : {title, description, imageUrl}
        });
    }
    
};