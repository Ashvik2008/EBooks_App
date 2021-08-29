import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import firebase from 'firebase';

export default class LoadingScreen extends Component {
  componentDidMount = () => {
    this.checkIfLoggedIn();
  };

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
