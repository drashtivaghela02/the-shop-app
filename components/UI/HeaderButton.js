import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';

import { HeaderButtons } from 'react-navigation-header-buttons';

const CustomHeaderButtun = props => {
    return <HeaderButtons 
        {...props} 
        IconComponent = {AntDesign}
        iconSize={23}
        color='white'
    />
};
export default CustomHeaderButtun;