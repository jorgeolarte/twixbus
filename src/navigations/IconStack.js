import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const IconStack = ({ name, focused, size, color }) => {
  const [iconName, setIconName] = useState(null);

  useEffect(() => {
    setIconName(() => {
      switch (name) {
        case 'Home':
          return 'home';
        case 'Profile':
          return 'user';
        case 'QRStack':
          return 'qrcode';
        default:
          return null;
      }
    });
  });

  return <Icon name={iconName} solid={focused} size={size} color={color} />;
};

export default IconStack;
