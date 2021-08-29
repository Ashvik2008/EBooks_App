import * as React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Login from './auth/LoginScreen'
import Loading from './auth/LoadingScreen'
import Dashboard from './auth/DashboardScreen'

import firebase from 'firebase'

const firebaseConfig = {
apiKey: "AIzaSyBETFQZooTJXOvLd6ohELFaZzbh_mVcdds",
  authDomain: "e-books-app-397f0.firebaseapp.com",
  projectId: "e-books-app-397f0",
  storageBucket: "e-books-app-397f0.appspot.com",
  messagingSenderId: "73750090476",
  appId: "1:73750090476:web:05d8ead601500134304bc9"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
else{
  firebaseConfig.app
}

export default function App() {
  return(
    <Dashboard />
  )
}

const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Login: Login,
  Dashboard: Dashboard
})

const AppNavigator = createAppContainer(AppSwitchNavigator)