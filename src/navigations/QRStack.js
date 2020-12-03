import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as screens from '../screens';

const QRStack = createStackNavigator();

const QRStackScreen = ({ scan }) => {
  console.log('scanning: ', scan.scanned);

  return (
    <QRStack.Navigator initialRouteName='Home' headerMode='none'>
      {!scan.scanned ? (
        <QRStack.Screen name='Scanner' component={screens.ScannerScreen} />
      ) : (
        <>
          <QRStack.Screen name='Ticket' component={screens.TicketScreen} />
          <QRStack.Screen name='Finished' component={screens.FinishedScreen} />
        </>
      )}
    </QRStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { scan: state.scan };
};

export default connect(mapStateToProps)(QRStackScreen);
