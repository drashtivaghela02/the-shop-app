// import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { NavigationActions } from 'react-navigation';

// import ShopsNavigator from './ShopNavigator';

// const NavigationContainer = props => {
//   const navRef = useRef();
//   const isAuth = useSelector(state => !!state.auth.token);

//   useEffect(() => {
//     if (!isAuth) {
//       navRef.current.dispatch(
//         NavigationActions.navigate({ routeName: 'Auth' })
//       );
//     }
//   }, [isAuth]);

//   return <ShopsNavigator ref={navRef} />;
// };

// export default NavigationContainer;
