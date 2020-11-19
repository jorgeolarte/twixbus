import { useState, useEffect } from 'react';
import Firebase from './Firebase';

const User = ({ props }) => {
  console.log('Hola: ', props);

  const { userUid, phone } = props;

  const [exist, setExist] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [amount, setAmount] = useState(0);

  // useEffect(() => {
  //   userExist();
  //   console.log('usuario existe? ', exist);
  //   if (!exist) {
  //     createUser(phone);
  //   }
  //   validateExist();
  //   loadAmount();
  // }, [userUid]);

  const validateExist = () => {
    Firebase.database()
      .ref(`users/${userUid}/isNew`)
      .once('value')
      .then((snapshot) => {
        let temp = snapshot.val();

        if (temp === null) {
          setIsNew(true);
        } else if (temp) {
          setIsNew(true);
        } else {
          setIsNew(false);
        }
      });
  };

  const loadAmount = () => {
    Firebase.database()
      .ref(`/users/${userUid}/amount`)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          setAmount(0);
        } else {
          setAmount(snapshot.val());
        }
        // console.log('User data: ', snapshot.val().amount);
      });
  };

  const userExist = () => {
    Firebase.database()
      .ref(`users/${userUid}`)
      .once('value')
      .then((snapshot) => {
        setExist(snapshot.exists());
      });
  };

  const createUser = (phone) => {
    Firebase.database().ref(`users/${userUid}`).set({
      phone,
      amount,
      isNew,
    });
  };

  return { isNew, amount, createUser };
};

export default User;
