import React from 'react';
import { Text, ScrollView, View, SafeAreaView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Card, Button, CheckBox } from 'react-native-elements';
import styles from '.././styles/styles';

export default class AboutScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={styles.headertitle}>About Us</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };

    render() {
      return (
        <ImageBackground 
        source={require('../assets/bkg_texture.png')}
        style={styles.container}
        >  
          
          <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>
            <Card
              containerStyle={styles.miniHeader}
              dividerStyle={{ backgroundColor: 'transparent' }}
            >
                <View>
                  <Text style={styles.title}>
                    Why this app exist ?
                    </Text>
                </View>
            </Card>
            <Text style={styles.paraText}>We know that being a college student, you can be a little tight on money . A lot of college students decide to forgo their meals
            which is not good for their developement. We would like to help you by connecting you to the food services available on the university so that you are well fed.</Text>

            <Card
containerStyle={styles.miniHeader}
              dividerStyle={{ backgroundColor: 'transparent' }}
            >
                <View>
                  <Text style={styles.title}>
                    What services do we provide?
                    </Text>
                </View>
            </Card>
            <Text style={styles.paraText}>
             This app would provide you with locations to the nearest food banks and would allow you to search for food items available in comet cupboard.
            </Text>
          </ScrollView>
        </ImageBackground>
      );
    }
  }
