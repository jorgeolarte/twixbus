import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UrbanScreen, NoOneScreen } from './types';
import { onScanned, offScanned } from '../reducers/scan';
import { firebase } from '../utils/Firebase';

const TicketScreen = ({ navigation, route, scan, onScanned, offScanned }) => {
  const [bus, setBus] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
    const getBus = () => {
      firebase
        .database()
        .ref(`/buses/${scan.carPlate}`)
        .once('value')
        .then((snapshot) => {
          let busTemp = snapshot.toJSON();
          setBus(busTemp);
          // setTicket({ bus: busTemp });
        });
    };

    return getBus();
  }, []);

  useEffect(() => {
    const getCompany = () => {
      if (typeof bus.idCompany !== 'undefined') {
        firebase
          .database()
          .ref(`/companies/${bus.idCompany}`)
          .once('value')
          .then((snapshot) => {
            let tempCompany = snapshot.toJSON();
            setCompany(tempCompany);
            // setTicket({ company: tempCompany });
          });
      }
    };

    return getCompany();
  }, [bus, setBus]);

  switch (bus.type) {
    case 'urbano':
      return <UrbanScreen bus={bus} company={company} />;
    default:
      return <NoOneScreen />;
  }
};

const mapStateToProps = (state) => {
  return { scan: state.scan };
};

const mapDispatchToProps = (dispatch) => ({
  onScanned: () => dispatch(onScanned()),
  offScanned: () => dispatch(offScanned()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen);
