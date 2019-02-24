import React from 'react';
import { Text, ScrollView, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import styles from "../styles/styles";

export default class CometCupboard extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={ styles.headertitle }>Comet Cupboard FAQ's</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };

    render() {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20}}>
          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                 What is Comet Cupboards ?  
                </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>The Comet Cupboard is a UT Dallas food pantry initiative dedicated to helping students in need. Its primary mission is to provide necessary food and personal care items to members of the UT Dallas community, but its impact reaches much further. The Comet Cupboard acts as a service learning component of the undergraduate academic experience and strives to cultivate a campus culture where the community is valued above individualism. The Comet Cupboard is located in MC 1.604, in the basement of the McDermott Library.</Text>

          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  Who can use comet cupboards ?
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>All students who are currently enrolled at UT Dallas are eligible to use the Comet Cupboard.</Text>

          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  Comet Cupboard permanent hours
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>Monday/Wednesday/Friday: 12:00pm - 4:30pm, Tuesday & Thursday: 1:30pm - 6:00pm 
          </Text>
          
          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  Food Banks near you
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>Click on the "Locations" tab on the bottom to view.</Text>
        </ScrollView>
      );
    }
  }