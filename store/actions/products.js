import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT'

export const fetchData = () => {
    return async dispatch => {
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
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
            dispatch({type: SET_PRODUCT, products : loadedProduct });
        } catch(err){
            //send custom analytics server
            throw err
        
        } 
    }
};


export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(`https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product/${productId}.json`, {
            method: 'DELETE',
        });

        dispatch({type : DELETE_PRODUCT, pid : productId})
    }
};

export const createProduct = (title, description, imageUrl, price) => {

    return async dispatch => { 
        // add any async code you want!
        const response = await fetch("https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product.json", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({title, description, imageUrl, price})
        });

        const resData = await response.json();
        console.log(resData)

        dispatch({
            type : CREATE_PRODUCT, 
            productData : {id : resData.name,  title, description, imageUrl, price}
        });
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch( `https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/product/${id}.json`, {
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