import React from 'react';
import {Text, View} from 'react-native';
import styles from '.././styles/styles';
export default class Notification extends React.Component {
    static navigationOptions = {
        tabBarLabel: '',
        headerTitle: <Text style={styles.headertitle}>Food Posts</Text>,
        headerStyle: {
          elevation: 0.4,
          shadowOpacity: 0.4
        }
      };
    render() {   
    return (<Text>Hello Hello</Text>);
    }
}