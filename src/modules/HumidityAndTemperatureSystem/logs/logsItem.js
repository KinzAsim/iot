import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {created_at,updated_at,duration,temperature,type,humidity} = this.props;

    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <Card containerStyle={{ backgroundColor: '#fff', borderRadius: 30,elevation: 1,width:wp('87%'),height:hp('13%')}}>
            <View style={{ flexDirection:'row'}}>
              {type === 'Temperature' ?(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'red'}}>Temperature:</Text>
              ):(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'red'}}>Humidity:</Text>
              )}
              {type === 'Temperature' ? (
                <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{temperature}</Text>
              ):(
                <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{humidity}</Text>
              )}            
            </View>
            
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>From:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{created_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>To:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{updated_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>Duration:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{duration}</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
export default Item;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize:hp('2%')
  },
  Icon: { fontSize: hp('3.5%'), color: 'white' },
});