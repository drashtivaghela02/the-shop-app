import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try{
            const response = await fetch(`https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`);
            if(!response.ok){
                throw new Error("Something Went wrong!!")
            }

            const resData = await response.json();
            console.log("Fetch data",resData)
            const loadedOrder = [];

            for(const key in resData){
                loadedOrder.push(new Order(
                    key,
                    resData[key].cartItem,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            dispatch({type: SET_ORDER, orders : loadedOrder });
        } catch(err){
            //send custom analytics server
            throw err
        } 
    }
}


export const addOrder = (cartItem, totalAmount) => {
    return async (dispatch, getState) => { 
        // add any async code you want!
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://the-shop-app-f2de3-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                cartItem, 
                totalAmount, 
                date : date.toISOString()
            })
        });

        if(!response.ok){
            throw new Error("Something Went wrong!!")
        }
        const resData = await response.json();
        // console.log(resData)

        dispatch({
            type : ADD_ORDER,
            orderData : {
                id : resData.name, 
                items : cartItem, 
                amount : totalAmount,
                date: date
            }
        });
    }
};  