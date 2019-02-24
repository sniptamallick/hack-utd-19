import React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';
import { Card, Button } from 'react-native-elements';
import styles from '.././styles/styles';


export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: <Text style={styles.headertitle}>Home</Text>,
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0.8,
        shadowOpacity: 0.8
    }
  };
    
    render() {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>
            <Touchable onPress={() => this.props.navigation.navigate('About')} style={styles.cardStyle} >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <ImageBackground
                  style={{ flex: 1, height: 200 }} 
                  source={require('.././assets/images/AboutUs.png')}
                  >
                  <View style={{ flex: 1 }} />
                  </ImageBackground>
                    <Text style={[styles.cardtitleBlack, { marginTop: 10 }]}>
                      About Us
                    </Text>
                    <Text style={styles.cardtextBlack}>
                      Learn more about our application and how it can help you
                    </Text>
                </View>
          </Touchable>

          <Touchable style={[styles.cardStyle]} onPress={() => { Linking.openURL('http://myfridgefood.com/') ;}} style={styles.cardStyle} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                     Meal Preps using your leftovers
                  </Text>
                </View>

          </Touchable>
          
          <Touchable onPress={() => this.props.navigation.navigate('Free')} style={[styles.cardStyle]} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                    Learn more about Comet Cupboards
                  </Text>
                </View>

          </Touchable>


          <Touchable onPress={() => { Linking.openURL('https://giving.utdallas.edu/CometCupboard'); }} style={[styles.cardStyle, { height: 60, backgroundColor: 'darkgreen' }]} >
                <View>
                  <Text style={[styles.cardtitle, { marginBottom: 10 }]}>
                    Click here to donate to Comet Cupboard
                  </Text>

                </View>

          </Touchable>
          
        </ScrollView>
      );
    }
  }
