import React from 'react';
import { UrbanType } from './transport';

export default ({ myTrip }) => {
  if (myTrip.state === true) {
    return myTrip.type == 'urbano' ? <UrbanType myTrip={myTrip} /> : null;
  } else {
    return null;
  }
};
