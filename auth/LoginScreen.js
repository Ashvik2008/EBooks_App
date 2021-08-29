import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import * as Google from 'expo-google-app-auth';

import firebase from 'firebase';

import { AntDesign } from '@expo/vector-icons';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: 'dark',
                })
                .then(function (snapshot) {});
            }
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '73750090476-fvl1pcpei10g6662sg33h4jgp1tnv959.apps.googleusercontent.com',
        iosClientId:
          '73750090476-pkl81n9nbhkdqo1e3u5jvsd91paq3mbt.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.pageTitle}>Hello welcome back!</Text>
            <Text style={styles.pageSUbTitle}>Signin to continue</Text>

            <Image source={require('../assets/Image.gif')} style={styles.centerImage}/>

            <Text style={styles.msg}>Keep Reading ANYTIME, ANYWHERE</Text>
          </View>

          <View style={styles.designer}>
            <View style={styles.whiteBox}>
              <TouchableOpacity style={styles.googleButton}  onPress={() => this.signInWithGoogleAsync()}>
                <AntDesign name="google" size={25} color="white" />
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <Text style={styles.agreement}>
                By Loging in to the app you agree to the Terms Of Service and
                Privacy Policy
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    height: '67%',
  },

  designer: {
    position: 'absolute',
    backgroundColor: '#39B4E6',
    bottom: 0,
    height: '33%',
    width: '100%',
    borderTopLeftRadius: 40,
    borderWidth: 2,
    justifyContent: 'center',
  },

  whiteBox: {
    borderWidth: 2,
    width: '80%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 35,
    backgroundColor: 'white',
  },

  googleButton: {
    backgroundColor: '#F9784B',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleButtonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    marginLeft: 15,
    fontFamily: 'Bubblegum-Sans',
  },

  agreement: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 18,
    bottom: 35,
    marginHorizontal: 20,
    fontFamily: 'Bubblegum-Sans',
  },

  pageTitle: {
    fontSize: 25,
    marginTop: 70,
    marginLeft: 20,
    fontWeight: 'bold',
    fontFamily: 'Bubblegum-Sans',
  },

  pageSUbTitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 20,
    fontFamily: 'Bubblegum-Sans',
  },

  centerImage: {
    alignSelf: 'center',
    width: '85%',
    height: '55%',
    marginBottom: 35,
    marginTop: 20,
  },

  msg: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Bubblegum-Sans',
    marginTop: 15
  },
});
