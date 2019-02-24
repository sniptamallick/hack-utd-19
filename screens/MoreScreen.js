import React from 'react';
import PlatformTouchable from 'react-native-platform-touchable';
import axios from 'axios';
import Touchable from 'react-native-platform-touchable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'firebase';
import { 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Picker, 
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from '.././styles/styles';
import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';


const INITIAL_TIME = new Date();
class MoreScreen extends React.Component {

  componentWillMount() {

    //Reading the location data from firebase
   const ref = firebase.database().ref('Food_locations');
   ref.on('value', (snapshot) => { this.setState({ DATA_RETURNED: snapshot.val() }); });
   }
  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={styles.headertitle}>Let others know about your leftovers</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };
    state = {
      name: '',
      email: '',
      Time: INITIAL_TIME,
      location: '',
      DATA_RETURNED: { markers: [], region: {} },
      showPicker: false,
      showPicker2: false,
      description: ''
    };

     setDate = (newDate) => {
      this.setState({ Time: newDate });
      this.setState({ showPicker: false });
    }

    handleTime = (text) => {
      this.setState({ Time: text });
    }
    /*
    This is the method used to implement the login feature
    We have the different variables whoes value we get from the state object
    Then we try to push those values to our firebase database
    It will give the optimal message depending upon the result
    */
    login = () => {
      const { name, email, Time, location, description } = this.state;
      const localDate = Time.toLocaleDateString();
      const localTime = Time.toLocaleTimeString();
      const apptDate = localDate;
      const time = localTime;
      const customerName = name;
      const emailId = email;
      const desc = description
      //It will not allow login when any of the fields is unaddressed
      if (this.state.name === ''  || this.state.description === '' || this.state.email === '' || this.state.Time === INITIAL_TIME || this.state.location === '') {
        Alert.alert('Not enough information');
        return;
      }
        //Pushing the information to firebase
        firebase.database().ref('/Food_Items/')
        .push({ customerName, emailId, apptDate, time, location, desc })
        .then(() => {
          Alert.alert('Your item has been added, Thank You for being considerate to others');
          //Reset the information
          this.setState({ name: '', email: '', description: '', Time: INITIAL_TIME, location: '' });
        })
        .catch(() => {
          if (this.state.name !== '')  {
            Alert.alert('Not enough information');
          }
        });
      this.setState({ showPicker2: false });
    };

    showSlotPicker = () => { 
      this.setState({ showPicker: true });
    };
    
    hideSlotPicker = () => {
      this.setState({ showPicker: false });
    };

    handleDatePicked = (date) => {
      this.setDate(date);
    };

    render() {
      const chooseTime = 
      this.state.Time !== INITIAL_TIME ? this.state.Time.toString() : 'When will the food expire ?';
      const chooseLocation = 
      this.state.location ? this.state.location : 'Choose a location';
      const size = this.state.showPicker === false 
        ? { height: 0, width: 0, alignSelf: 'center' } : { width: 300, alignSelf: 'center' };
      const size2 = this.state.showPicker2 === false ? { height: 0, width: 0 } : { flex: 1 };
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView>
          <Text style={styles.requestTitle}>Enter the information</Text>
  
          <TextInput 
            style={myStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter your Name"
            placeholderTextColor="#dddddd"
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          
          <TextInput 
            style={myStyles.input}
            textContentType="emailAddress"
            underlineColorAndroid="transparent"
            placeholder="Enter your UTD Email"
            placeholderTextColor="#dddddd"
            keyboardType='email-address'
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput 
            style={myStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter the Food Item"
            placeholderTextColor="#dddddd"
            autoCapitalize="none"
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />

          <Touchable
          onPress={this.showSlotPicker}
          style={styles.button}
          >
            <View>
                <Text style={styles.cardtext}>
                {chooseTime}
                </Text>
            </View>
          </Touchable>
          
          <View style={size}>
            <DateTimePicker
            isVisible={this.state.showPicker}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideSlotPicker} 
            mode='date'
            />
          </View>


          <Touchable
          onPress={showPicker2 => this.setState({ showPicker2: !this.state.showPicker2 })}
          style={[styles.button, { backgroundColor: '#666666' }]}
          > 
            <View>
                <Text style={styles.cardtext}>
                {chooseLocation}
                </Text>
            </View>
          </Touchable>
          <View>
          <Picker
              selectedValue={this.state.location}
              style={size2}
              onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}
          >
              {this.state.DATA_RETURNED.markers.map(
                Location => 
                <
                  Picker.Item 
                key={Location.title} 
                label={Location.title} 
                value={Location.title} 
                />
              )}
            </Picker>
          </View>
          <Touchable 
          onPress={this.login}
          style={styles.submitButton}
          > 
            <View>
                <Text style={styles.cardtext}>
                  Submit information
                </Text>
            </View>
        </Touchable>
      </ScrollView>
      </View>
      );
    }
}

const myStyles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  title: {
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
     margin: 15,
     padding: 5,
     height: 40,
     borderColor: '#aaaaaa',
     borderRadius: 4,
     borderWidth: 1,
     fontFamily: 'mainFont'
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText: {
     color: 'white'
  }
});

export default MoreScreen;
