import { makeType, mac } from '../utils/Reducers';

const initialState = {
  userUid: null,
  phoneNumber: '',
  name: '',
  email: '',
  amount: 0,
  isNew: true,
  token: '',
};

const t = makeType('user');

const IS_LOGIN = t('IS_LOGIN');
const SIGN_OUT = t('SIGN_OUT');
const SIGN_IN = t('SIGN_IN');
const SET_PHONE = t('SET_PHONE');
const SET_AMOUNT = t('SET_AMOUNT');
const SET_ISNEW = t('SET_ISNEW');
const SET_TOKEN = t('SET_TOKEN');
const SET_NAME = t('SET_NAME');
const SET_EMAIL = t('SET_EMAIL');

export const isLogin = mac(IS_LOGIN);
export const signIn = mac(SIGN_IN, 'payload');
export const signOut = mac(SIGN_OUT);
export const setPhone = mac(SET_PHONE, 'payload');
export const setAmount = mac(SET_AMOUNT, 'payload');
export const setIsNew = mac(SET_ISNEW, 'payload');
export const setToken = mac(SET_TOKEN, 'payload');
export const setName = mac(SET_NAME, 'payload');
export const setEmail = mac(SET_EMAIL, 'payload');

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
        phoneNumber: '',
        name: '',
        email: '',
        amount: 0,
        isNew: true,
        token: '',
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

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state;
  }
};
