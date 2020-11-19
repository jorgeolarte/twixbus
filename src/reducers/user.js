import { makeType, mac } from '../utils/Reducers';

const initialState = {
  userUid: null,
  phoneNumber: '',
  amount: 0,
  isNew: true,
};

const t = makeType('user');

const IS_LOGIN = t('IS_LOGIN');
const SIGN_OUT = t('SIGN_OUT');
const SIGN_IN = t('SIGN_IN');
const SET_PHONE = t('SET_PHONE');
const SET_AMOUNT = t('SET_AMOUNT');
const SET_ISNEW = t('SET_ISNEW');

export const isLogin = mac(IS_LOGIN);
export const signIn = mac(SIGN_IN, 'payload');
export const signOut = mac(SIGN_OUT);
export const setPhone = mac(SET_PHONE, 'payload');
export const setAmount = mac(SET_AMOUNT, 'payload');
export const setIsNew = mac(SET_ISNEW, 'payload');

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userUid: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        userUid: null,
      };

    case IS_LOGIN:
      return state;

    case SET_PHONE:
      return {
        ...state,
        phoneNumber: action.payload,
      };

    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };

    case SET_ISNEW:
      return {
        ...state,
        isNew: action.payload,
      };

    default:
      return state;
  }
};