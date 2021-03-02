/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card } from 'react-native-elements';
import { colors, fonts } from '../../../styles';

class Item extends PureComponent {

  render() {
    const { created_at, updated_at, messagedata, title } = this.props; 
      return (
        <View style={styles.container}>
          <Card containerStyle={styles.cardMainContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>{title}: </Text>
              <Text style={styles.valueText}>
                {messagedata === 1 && title === 'motor'
                  ? 'ON'
                  : messagedata === 0 && title === 'motor'
                  ? 'OFF'
                  : messagedata === 1 && title === 'force-motor'
                  ? 'ON'
                  : messagedata === 0 && title === 'force-motor'
                  ? 'OFF'
                  : messagedata}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title} numberOfLines={1}>
                From:{' '}
              </Text>
              <Text style={styles.dates} numberOfLines={1}>
                {created_at}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title} numberOfLines={1}>
                To:{' '}
              </Text>
              <Text style={styles.dates} numberOfLines={1}>
                {updated_at}
              </Text>
            </View>
          </Card>
        </View>
      );
    
  }
}
export default Item;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cardMainContainer: {
    padding: 8,
    paddingLeft: 20,
    borderRadius: 10,
    marginVertical: hp('-1.3%'),
    marginHorizontal: wp('3%'),
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 5,
    shadowColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: colors.gray,
    fontWeight: 'bold',
  },
  valueText: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#617ae1',
  },
  dates: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.5%'),
    color: colors.lightGray,
    marginTop: 2.4,
  },
});
