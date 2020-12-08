import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { Colors, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../../utils/Firebase';
import { useNavigation } from '@react-navigation/native';

const UrbanScreen = ({ user, bus, company }) => {
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(true);
  const [price, setPrice] = useState(0);
  const [tickets, setTickets] = useState(1);
  const [total, setTotal] = useState(0);

  const [logoLoading, setLogoLoading] = useState(true);
  const [logoCompany, setLogoCompany] = useState(null);

  useEffect(() => {
    setDisabled(user.amount < total ? true : false);
  }, [total, setTotal, user.amount]);

  useEffect(() => {
    setPrice(company.price);
  }, [company]);

  useEffect(() => {
    setTotal(tickets * price);
  }, [tickets, setTickets, price, setPrice]);

  useEffect(() => {
    const loadImage = () => {
      if (typeof company.image !== 'undefined') {
        firebase
          .storage()
          .ref(`companies/${company.idCompany}.jpg`)
          .getDownloadURL()
          .then((url) => {
            setLogoCompany(url);
            setLogoLoading(false);
          })
          .catch((error) => {
            //------
            // TODO
            // Cargar logo por defecto
            //------
            console.log('firebase err: ', error);
            setLogoLoading(true);
          });
      }
    };

    return loadImage();
  }, [company]);

  const buyTicket = () => {
    let now = Date.now();

    let mytrip = {
      type: 'urbano',
      carPlate: bus.carPlate,
      company: company.name,
      idCompany: company.idCompany,
      tickets: tickets,
      price: company.price,
      total: total,
      createdAt: now,
      state: true,
    };

    let newAmount = {
      amount: user.amount - total,
    };

    try {
      firebase.database().ref(`mytrips/${user.userUid}/${now}`).set(mytrip);
      firebase.database().ref(`users/${user.userUid}`).update(newAmount);
      navigation.navigate('Finished');
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.card}> */}
      <View style={styles.header}>
        {logoLoading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Image style={styles.image} source={{ uri: `${logoCompany}` }} />
        )}
        <Text style={styles.heading}>{company.name}</Text>
      </View>
      <View style={styles.busInfo}>
        <View style={styles.iconContainer}>
          <Icon name='user-tie' size={50} color={Colors.dark} />
          <Text style={styles.textHelp}>Conductor</Text>
          <Text style={styles.textIconContainer}>{bus.driver}</Text>
        </View>
        <View style={[styles.iconContainer, styles.line]}>
          <Icon name='bus' size={50} color={Colors.dark} />
          <Text style={styles.textHelp}>Bus</Text>
          <Text style={styles.textIconContainer}>{bus.carPlate}</Text>
        </View>
      </View>
      <View style={styles.ticketContainer}>
        <Text style={styles.textTicket}>Cantidad de pasajes</Text>
        <View style={styles.tickets}>
          <Icon
            name='user'
            size={50}
            solid={tickets >= 1 ? true : false}
            color={tickets >= 1 ? Colors.primary : Colors.hover.primary}
            onPress={() => setTickets(1)}
          />
          <Icon
            name='user'
            size={50}
            solid={tickets >= 2 ? true : false}
            color={tickets >= 2 ? Colors.primary : Colors.hover.primary}
            onPress={() => setTickets(2)}
          />
          <Icon
            name='user'
            size={50}
            solid={tickets >= 3 ? true : false}
            color={tickets >= 3 ? Colors.primary : Colors.hover.primary}
            onPress={() => setTickets(3)}
          />
          <Icon
            name='user'
            size={50}
            solid={tickets >= 4 ? true : false}
            color={tickets >= 4 ? Colors.primary : Colors.hover.primary}
            onPress={() => setTickets(4)}
          />
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceDescriptions}>
          <Text style={styles.priceDescription}>Precio:</Text>
          <Text style={styles.priceDescription}>Cantidad:</Text>
          <Text style={styles.priceDescription}>Total:</Text>
        </View>
        <View style={styles.priceAmounts}>
          <Text style={styles.priceAmount}>${company.price}</Text>
          <Text style={styles.priceAmount}>{tickets}</Text>
          <Text style={styles.priceAmount}>${total}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={Colors.hover.secondary}
          disabled={disabled}
          style={[styles.button, disabled ? styles.buttonDisabled : null]}
          onPress={buyTicket}
        >
          {disabled ? (
            <Text style={styles.buttonText}>Fondos insuficientes</Text>
          ) : (
            <Text style={styles.buttonText}>Comprar</Text>
          )}
        </TouchableHighlight>
      </View>
      {/* </View> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UrbanScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.disabled,
    padding: 20,
    backgroundColor: Colors.white,
    alignContent: 'space-between',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  heading: {
    fontSize: Typography.heading,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  busInfo: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary,
  },
  textIconContainer: {
    fontSize: Typography.normal,
    color: Colors.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textHelp: {
    fontSize: Typography.small,
    color: Colors.dark,
    textAlign: 'center',
    paddingTop: 10,
  },
  ticketContainer: {
    paddingVertical: 20,
  },
  textTicket: {
    textAlign: 'center',
    fontSize: Typography.normal,
  },
  tickets: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  priceDescriptions: {
    flex: 3,
  },
  priceDescription: {
    color: Colors.dark,
    fontSize: Typography.normal,
    textAlign: 'right',
  },
  priceAmounts: {
    flex: 1,
  },
  priceAmount: {
    color: Colors.dark,
    fontSize: Typography.normal,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 12,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: Colors.hover.danger,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
