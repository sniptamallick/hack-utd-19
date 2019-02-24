import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import firebase, { firestore } from 'firebase'
import styles from '.././styles/styles';
import { Card } from 'react-native-elements';

export default class Notification extends React.Component {
  
    static navigationOptions = {
        tabBarLabel: '',
        headerTitle: <Text style={styles.headertitle}>Food Posts</Text>,
        headerStyle: {
          elevation: 0.4,
          shadowOpacity: 0.4
        }
      };
    
      state = { value: 0, DATA_RETURNED: {} }
    componentWillMount() {
        //Reading the location data from firebase
       const ref = firebase.database().ref();
       ref.on('value', (snapshot) => { this.setState({  value: 1, DATA_RETURNED: snapshot.val() }); });  
       }
    render() {
        if (this.state.value === 1) {
        console.log(this.state.DATA_RETURNED.Food_Items);
        return (
            <ScrollView>
                <View>
            {this.state.DATA_RETURNED.Food_Items.map(
                Item => 
                <Card
containerStyle={styles.miniHeader}
dividerStyle={{ backgroundColor: 'transparent' }}
>
  <View>
    <Text style={styles.title}>
        {Item.desc}
    </Text>
    <Text style={styles.title}>
        {Item.apptDate}
    </Text>
    <Text style={styles.title}>
        {Item.emailId}
    </Text>
    <Text style={styles.title}>
        {Item.location}
    </Text>
    <Text style={styles.title}>
        {Item.time}
    </Text>
  </View>
</Card>
        )}</View>
            </ScrollView>
        )
        
        } 
     else {
         return (<Text>Nothing is available</Text>);
     } 
     }

}

