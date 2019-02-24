import React from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import { Font } from 'expo';
import {
   StackNavigator, TabNavigator, TabBarBottom, NavigationActions 
  } from 'react-navigation'; // 1.0.0-beta.27
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2


//import screens
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import DetailsScreen from './screens/DetailsScreen';
import AboutScreen from './screens/AboutScreen';
import CometCupboard from './screens/CometCupboard';
import MapScreen from './screens/MapScreen';
import Notification from './screens/Notifications';

if ((process.env.NODE_ENV || '').toLowerCase() === 'production') {
  // disable console. log in production
  console.log = function () {};
  console.info = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.debug = function () {};
}

const fade = (props) => {
  const { position, scene } = props;

  const index = scene.index;

  const translateX = 0;
  const translateY = 0;

  const opacity = position.interpolate({
      inputRange: [index - 0.7, index, index + 0.7],
      outputRange: [0.3, 1, 0.3]
  });

  return {
      opacity,
      transform: [{ translateX }, { translateY }]
  };
};

const fade2 = (props) => {
  const { position, scene } = props;

  const index = scene.index;

  const translateX = position.interpolate({
    inputRange: [index - 0.4, index, index + 0.4],
    outputRange: [10.3, 1, 10.3]
});
  const translateY = 0;

  const opacity = position.interpolate({
      inputRange: [index - 0.3, index, index + 0.3],
      outputRange: [0.7, 1, 0.7]
  });

  return {
      opacity,
      transform: [{ translateX }, { translateY }]
  };
};
const NotificationStack = StackNavigator({
  Notification: { screen: Notification },
},
{
  transitionConfig: () => ({
      screenInterpolator: (props) => fade(props)
  })
}
);
const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
   },
  About: { screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  Free: { screen: CometCupboard,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
},
{
  transitionConfig: () => ({
      screenInterpolator: (props) => fade(props)
  })
}
);

const MapStack = StackNavigator({
  Map: { screen: MapScreen },
  Details: { screen: DetailsScreen,
    navigationOptions: {
      tabBarLabel: 'Map',
    } },

},
{
  transitionConfig: () => ({
      screenInterpolator: (props) => fade(props)
  })
}
);

const MoreStack = StackNavigator({
  More: { screen: MoreScreen },
  LocationPicker: { screen: MapScreen },
},

{
  transitionConfig: () => ({
      screenInterpolator: (props) => fade(props)
  })
}
);

const navigateOnce = (getStateForAction) => (action, state) => {
  const { type, routeName } = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
  // you might want to replace 'null' with 'state' if you're using redux (see comments below)
};

//ADD FOR EVERY NEW STACKNAVIGATOR
// Prevents multiple pages opening at once

HomeStack.router.getStateForAction = navigateOnce(HomeStack.router.getStateForAction);
MoreStack.router.getStateForAction = navigateOnce(MoreStack.router.getStateForAction);
MapStack.router.getStateForAction = navigateOnce(MapStack.router.getStateForAction);
NotificationStack.router.getStateForAction = navigateOnce(NotificationStack.router.getStateForAction);

////********* */

const AppContent = TabNavigator(
  {
    Home: { screen: HomeStack },
    Map: { screen: MapStack },
    More: { screen: MoreStack },
    Notification: { screen: NotificationStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Map') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'More') {
          iconName = `ios-more${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notification') {
          iconName = `ios-mail${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={30} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        borderTopColor: '#DDDDDD',
        backgroundColor: 'white',
        elevation: 10,
        shadowOpacity: 0.1,
      },
      activeTintColor: '#000000',
      inactiveTintColor: 'gray',
      showLabel: false,
      labelStyle: {
        fontFamily: 'mainFont',
      },
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default class App extends React.Component {

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAtqlQ2cztTeAuZ-ickHs0b_BADW1snHGs',
      authDomain: 'hack-utd.firebaseapp.com',
      databaseURL: 'https://hack-utd.firebaseio.com',
      projectId: 'hack-utd',
      storageBucket: 'hack-utd.appspot.com',
      messagingSenderId: '877117592545'
    };
    firebase.initializeApp(config);
  }
  state = {
    fontLoaded: false,
  };

async componentDidMount() {
  await Font.loadAsync({
    mainFontBold: require('./fonts/RobotoCondensed-Regular.ttf'),
    mainFont: require('./fonts/RobotoCondensed-Regular.ttf'),
  });

  this.setState({ fontLoaded: true });
  }


render() {
  return (
    this.state.fontLoaded ? (
    <View style={{ flex: 1 }}>
    <StatusBar translucent backgroundColor="#ffffff" barStyle="dark-content" />
  <AppContent />
  </View>) : null
);
}

}

