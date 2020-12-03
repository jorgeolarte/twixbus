import React from 'react';
import { UrbanType } from './cards';

export default ({ myTrip }) => {
  if (myTrip.state === true) {
    return myTrip.type == 'urbano' ? <UrbanType myTrip={myTrip} /> : null;
  } else {
    return null;
  }
};
