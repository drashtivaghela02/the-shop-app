import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId, token) => {
    return dispatch =>{
        dispatch({ type : AUTHENTICATE, userId: userId, token : token})
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_lYsisFfIj2AOFKacTHa4u7fLtiQfAFs', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true
            })
            }
        ); //.then((res)=>{console.log("responce", res)}).catch((error)=>{console.log("error",error)})
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
              message = 'This email exists already!';
            }
            throw new Error(message);
        }
        const resData = await response.json();
        // console.log("Sign up rsData",resData.error.errors);
    
        // dispatch({ type : SIGNUP, token : resData.idToken, userId : resData.localId});
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId,expirationDate);
    };

};


export const login = (email, password) => {
    return async dispatch => {
        const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_lYsisFfIj2AOFKacTHa4u7fLtiQfAFs', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email : email,
                password : password,
                returnSecureToken : true
            })
            }
        ); //.then((res)=>{console.log("responce", res)}).catch((error)=>{console.log("error",error)})
        if(!response.ok){
            const errorResData = await response.json();
            console.log("errorResData",errorResData.error.errors);  
            const errorId = errorResData.error.message;
            let message  = 'Something Went wrong!'  ;
            if(errorId === 'INVALID_LOGIN_CREDENTIALS'){
                message = "The data could not be found!"
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log("rsData",resData);
        dispatch(authenticate(resData.localId, resData.idToken));
        // dispatch({ type : LOGIN, token : resData.idToken, userId : resData.localId});
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId,expirationDate);
    };

};

export const logout = () => {
    return { type: LOGOUT };
};



const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate : expirationDate.toISOString()
        })
    );
}