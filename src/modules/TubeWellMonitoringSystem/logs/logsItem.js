import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import LogScreen from './logs';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { logs, updated_at, created_at, duration, type } = this.props;

    return (
      // <LinearGradient colors={["#114EC0","#0656ED","#0F47B0","#0527C6"]}  style={{padding:0,width:wp('95%'),backgroundColor:'#007ff8',marginTop:hp('2%'),marginLeft:wp('2.5%'),elevation:5,height:hp('15%'),borderTopLeftRadius:25,
      // borderBottomRightRadius:25}}>
      <View style={{ flex: 1, marginBottom: hp('2%') }}>
        <View style={{
          width: wp('95%'), height: hp('14%'), borderTopLeftRadius: 25,
          borderBottomRightRadius: 25, elevation: 1, marginLeft: wp('2%')
        }}>
          <View style={{ marginTop: hp('1%'), flexDirection: 'row' }}>
          {type === 'Fill Level Logs' ? (
              <Text style={{ marginLeft: wp('5%'), fontWeight: 'bold', color: '#114EC0' }}>FillLevel: </Text>
            ) : type === 'Tank Lid Status Logs' ||  type === 'Force Hydro Pump Status Logs'  || type === 'Hydro Pump Maintenance Logs' || type === 'Smoke Alarm Status Logs' ||
             type === 'Door Status Logs' || type === 'Filter Maintenance Logs' || type === 'Hydro Pump Status Logs' || type === 'Main Line Status Logs' ? (
              <Text style={{ marginLeft: wp('5%'), fontWeight: 'bold', color: '#114EC0' }}>Status: </Text>
            ): type === 'TDS Value Logs' || type === 'PH Value Logs'   ?
            (
              <Text style={{ marginLeft: wp('5%'), fontWeight: 'bold', color: '#114EC0' }}>Value: </Text>
            ):(null)}

            {type === 'Tank Lid Status Logs' || type === 'Door Status Logs' ? (
              <>
              {logs === 1 ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') }}>Open</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Close</Text>
              )}
              </>              
            ):  
            type === 'Hydro Pump Status Logs'  || type === 'Force Hydro Pump Status Logs' ? (
              <>
              {logs === 1 ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') }}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>OFF</Text>
              )}
              </>              
            ):
             type === 'Smoke Alarm Status Logs'    ? (
              <>
              {logs === true ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') }}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>OFF</Text>
              )}
              </>   
            ):
            type === 'Phase Logs' ? (
              <>
              {logs === true ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') }}>Power Up</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Power Down</Text>
              )}
              </> 
            ):(
              <Text style={{ marginLeft: wp('1%'), color: '#083194', fontWeight: 'bold', marginLeft: wp('3%') }}>{logs}</Text>
            )}
            
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (
              <Text style={{ marginLeft: wp('5%'), fontWeight: 'bold', color: '#114EC0' }}>Running Time: </Text>
            ) : (
                <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Duration: </Text>
              )}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{duration}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Performed At: </Text>
            ) : (
                <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> From: </Text>
              )}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{created_at}</Text>
          </View>

          {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (null) : (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> To: </Text>
              <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{updated_at}</Text>
            </View>
          )}


          {/* <View style={{flexDirection:'row'}}>
              <Text style={{marginLeft:wp('4%'),fontWeight:'bold',color:'#114EC0'}}> Duration: </Text>
              {/* <Text style={{marginLeft:wp('1%'),color:'#000'}}>{duration}</Text> */}
          {/* </View> */}
        </View>
      </View>
      // {/* </LinearGradient> */}


    );
  }
}
export default Item;

const styles = StyleSheet.create({
  itemThreeContainer: {
    backgroundColor: 'transparent',
    padding: wp('3%'),
    borderRadius: wp('2.5%'),
    //width:wp('100%'),
    //shadowColor: colors.background,
    shadowOffset: {
      width: wp('0%'),
      height: hp('1%'),
    },
    //shadowOpacity: 0.25,
    //shadowRadius: wp('10%'),
    //elevation: wp('1%'),
    //marginVertical: hp('0.5%'),
    //marginHorizontal:wp('2%'),
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: wp('2%'),
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#000',
    marginLeft: wp('15%')
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.5%'),
    color: colors.whiteOne,
    marginTop: hp(0.3)
  },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#000',

  }
});



