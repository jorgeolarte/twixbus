import { makeType, mac } from '../utils/Reducers';

const initialState = {
  isNewUser: false,
  token: '',
};

const t = makeType('auth');

const SET_ISNEWUSER = t('SET_ISNEWUSER');
const SET_TOKEN = t('SET_TOKEN');

export const setIsNewUser = mac(SET_ISNEWUSER, 'payload');
export const setToken = mac(SET_TOKEN, 'payload');

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ISNEWUSER:
      return {
        ...state,
        isNewUser: action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};
