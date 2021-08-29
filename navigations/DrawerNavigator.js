import React, { Component } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;