const RoutesConfig = {
  screens: {
    Offline: 'Offline',
    LoginStack: {
      screens: {
        Login: 'Login',
        Code: 'Code',
      },
    },
    AppStack: {
      screens: {
        MainStack: {
          screens: {
            Home: 'Home',
            Profile: 'Profile',
            QRStack: {
              screens: {
                Scanner: 'Scanner',
                Ticket: {
                  path: 'bus/:carPlate',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default RoutesConfig;
