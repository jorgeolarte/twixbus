import { makeType, mac } from '../utils/Reducers';

const initialState = {
  carPlate: null,
  scanned: false,
};

const t = makeType('scan');

const SET_CARPLATE = t('SET_CARPLATE');
const ON_SCANNED = t('ON_SCANNED');
const OFF_SCANNED = t('OFF_SCANNED');

export const setCarPlate = mac(SET_CARPLATE, 'payload');
export const onScanned = mac(ON_SCANNED);
export const offScanned = mac(OFF_SCANNED);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARPLATE:
      return {
        ...state,
        carPlate: action.payload,
      };

    case ON_SCANNED:
      return {
        ...state,
        scanned: true,
      };

    case OFF_SCANNED:
      return {
        ...state,
        scanned: false,
      };

    default:
      return state;
  }
};

export const reset = (status) => async (dispatch) => {
  try {
    dispatch(setCarPlate(null));
    dispatch(offScanned());
  } catch (err) {
    console.log('reset scan: ', err);
  }
};
