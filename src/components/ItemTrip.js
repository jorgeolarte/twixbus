import React from 'react';
import { UrbanType } from './transport';

export default ({ myTrip }) => {
  const tripDate = new Date(myTrip.createdAt);
  console.log('-------------1--------');
  console.log('createdAt: ', tripDate.toString());

  return myTrip.type == 'urbano' ? (
    <UrbanType myTrip={myTrip} formatDate={tripDate.toString()} />
  ) : null;
};
