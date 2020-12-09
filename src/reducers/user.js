import { makeType, mac } from '../utils/Reducers';

const initialState = {
  userUid: null,
  phoneNumber: '',
  name: '',
  email: '',
  birthdate: 0,
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
const SET_NAME = t('SET_NAME');
const SET_EMAIL = t('SET_EMAIL');
const SET_BIRTHDATE = t('SET_BIRTHDATE');

export const isLogin = mac(IS_LOGIN);
export const signIn = mac(SIGN_IN, 'payload');
export const signOut = mac(SIGN_OUT);
export const setPhone = mac(SET_PHONE, 'payload');
export const setAmount = mac(SET_AMOUNT, 'payload');
export const setIsNew = mac(SET_ISNEW, 'payload');
export const setName = mac(SET_NAME, 'payload');
export const setEmail = mac(SET_EMAIL, 'payload');
export const setBirthdate = mac(SET_BIRTHDATE, 'payload');

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
        birthdate: 0,
        amount: 0,
        isNew: true,
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

    case SET_BIRTHDATE:
      return {
        ...state,
        birthdate: action.payload,
      };

    default:
      return state;
  }
};

export const loadUser = (status) => async (dispatch) => {
  let { phoneNumber, name, email, amount, isNew, birthdate } = status;

  try {
    typeof phoneNumber === undefined ? null : dispatch(setPhone(phoneNumber));
    typeof name === undefined ? null : dispatch(setName(name));
    typeof email === undefined ? null : dispatch(setEmail(email));
    typeof amount === undefined ? null : dispatch(setAmount(amount));
    typeof isNew === undefined ? null : dispatch(setIsNew(isNew));
    typeof birthdate === undefined ? null : dispatch(setBirthdate(birthdate));
  } catch (err) {
    console.log('loadUser: ', err);
  }
};
