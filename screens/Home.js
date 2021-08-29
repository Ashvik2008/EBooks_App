import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let books = require('../TemporaryBooks.json');

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import BooksCard from '../components/StoryCoverPageCard'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  renderItem = ({ item: books }) => {
    return <BooksCard books={books} navigation={this.props.navigation}/>;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search a book"
              placeholderTextColor={'#909090'}
            />
          </View>
          <View style={styles.main}>
            <Text style={styles.treandingHeader}>Trending Books</Text>
            <View style={styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                data={books}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },

  inputContainer: {
    width: '80%',
    borderWidth: 2,
    height: 50,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#FCC00E',
    marginTop: 150,
    flexDirection: 'row',
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: 'white',
    position: 'absolute',
    left: -5,
    top: -10,
    paddingLeft: 25,
    fontFamily: 'Bubblegum-Sans',
    fontSize: 20,
  },

  main: {
    backgroundColor: '#39B4E6',
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    borderWidth: 2,
    marginTop: 50,
    borderTopLeftRadius: 40,
  },

  treandingHeader: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 35,
  },

  cardContainer: {
    marginLeft: 35
  },
});
