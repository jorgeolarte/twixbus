import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userUid: null,
  phoneNumber: "",
  amount: 0,
};

const IS_LOGIN = "IS_LOGIN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_IN = "SIGN_IN";

export const signIn = (userUid) => ({
  type: SIGN_IN,
  payload: userUid,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const isLogin = () => ({
  type: IS_LOGIN,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      try {
        AsyncStorage.setItem("@user_uid", action.payload);
      } catch (err) {}
      return {
        ...state,
        userUid: action.payload,
      };

    case SIGN_OUT:
      try {
        AsyncStorage.removeItem("@user_uid");
      } catch (err) {}
      return {
        ...state,
        userUid: null,
      };

    case IS_LOGIN:
      AsyncStorage.getItem("@user_uid")
        .then((res) => {
          return {
            ...state,
            userUid: res,
          };
        })
        .catch((err) => {
          console.log("error: ", err);
          return { ...state };
        });

    default:
      return state;
  }
};
