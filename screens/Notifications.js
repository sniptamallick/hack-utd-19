import React from 'react';
import { Text } from 'react-native';
import firebase, { firestore } from 'firebase'
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
    
      state = { value: 0, DATA_RETURNED: {} }
    componentWillMount() {
        //Reading the location data from firebase
       const ref = firebase.database().ref();
       ref.on('value', (snapshot) => { this.setState({  value: 1, DATA_RETURNED: snapshot.val() }); });  
       }
    render() {
        console.log(this.state.DATA_RETURNED);
        if(this.state.value === 1){
        let string = ''
     for( let i = 1; i <= this.state.DATA_RETURNED.Keys; i++){
         string += this.state.DATA_RETURNED.Food_Items[i].desc +"\n";
     }
     return <Text>{string}</Text>
    }
     else{
        return (<Text>Not Rendered Yet</Text>)
     
    }}
}
