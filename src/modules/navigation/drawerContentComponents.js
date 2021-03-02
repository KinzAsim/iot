/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { NavigationActions, ScrollView } from 'react-navigation';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Bars } from 'react-native-loader';
import { logout } from '../../redux/actions/authActions';
import { fonts, colors } from '../../styles';

const background = require("../../../assets/images/tubewell.png");

class drawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  toggleDrawer = () => {
    // Props to open/close the drawer
    this.props.navigation.closeDrawer();
  };

  fuelNav = () => {
    this.props.navigation.navigate('Fuel Monitoring System');
    this.toggleDrawer();
  };

  liquidNav = () => {
    this.props.navigation.navigate('Smart Farm Fisheries');
    this.toggleDrawer();
  };

  temperatureNav = () => {
    this.props.navigation.navigate('Temperature Monitoring System');
    this.toggleDrawer();
  };

  coldchainNav = () => {
    this.props.navigation.navigate('Cold Chain Monitoring System');
    this.toggleDrawer();
  };

  waterQualityNav = () => {
    this.props.navigation.navigate('Water Quality Monitoring System');
    this.toggleDrawer();
  };

  assetTrackingNav = () => {
    this.props.navigation.navigate('Fixed Asset Tracking System');
    this.toggleDrawer();
  };

  energyNav = () => {
    this.props.navigation.navigate('Energy Monitoring System');
    this.toggleDrawer();
  };

  tankNav = () => {
    this.props.navigation.navigate('Water Tank System');
    this.toggleDrawer();
  };

  envNav = () => {
    this.props.navigation.navigate('Environment Monitoring System');
    this.toggleDrawer();
  };

  tubeNav = () => {
    this.props.navigation.navigate('Tubewell Monitoring System');
    this.toggleDrawer();
  };

  smartLightNav = () => {
    this.props.navigation.navigate('Smart Highway Lighting System');
    this.toggleDrawer();
  };
  
  HumidityTempNav = () => {
    this.props.navigation.navigate('Humidity & Temperature Monitoring System');
    this.toggleDrawer();
  }
  SecurityNav = () => {
    this.props.navigation.navigate('Security System');
    this.toggleDrawer();
  }
  RectifierNav = () => {
    this.props.navigation.navigate('Rectifier & Backup Battery Monitoring System');
    this.toggleDrawer();
  }
  handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Do you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            AsyncStorage.removeItem('userToken');
            this.props.logout();
            this.props.navigation.navigate('Auth');
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { user, loading } = this.props;
    console.log('user',user);

    return (
      <View>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bars size={15} color={colors.primary} />
          </View>
        ) : (
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <ImageBackground
                  source={require('../../../assets/images/iot6.jpg')}
                  style={{ flex: 1, width: wp('69%'), justifyContent: 'center' }}
                >
                  <TouchableOpacity>
                    <Image
                      source={require('../../../assets/images/photos.jpeg')}
                      // borderRadius style will help us make the Round Shape Image
                      style={{
                        width: 63,
                        height: 63,
                        borderRadius: 63 / 2,
                        marginLeft: wp('4.5%'),
                        marginBottom: hp('0.5%'),
                        marginTop: hp('11%'),
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>{user.name}</Text>
                  <Text style={styles.headerText1}>
                    Dashboards: {user.dashboards.length}{' '}
                  </Text>
                </ImageBackground>
              </View>

            <View style={styles.screenContainer}>       
            <View style={{height:hp('65%')}}>     
              <ScrollView style={{height:hp('100%')}}> 
              {user.dashboards.findIndex(
                  d => d.title === 'Fuel Monitoring System',
                ) === -1 ? null : (
                    // eslint-disable-next-line eqeqeq
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Fuel Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                        name="fuel"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Fuel Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Fuel Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.fuelNav}
                      >
                        Fuel Monitoring System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Smart Farm Fisheries',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Farm Fisheries'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                        name="fish"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Smart Farm Fisheries'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Smart Farm Fisheries'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.liquidNav}
                      >
                        Smart Farm Fisheries
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Temperature Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Temperature Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon2
                        name="thermometer"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey ==
                            'Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 16 },
                          this.props.activeItemKey ==
                            'Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.temperatureNav}
                      >
                        Temperature Monitoring System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Cold Chain Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Cold Chain Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon
                        name="sourcetree"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Cold Chain Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 16 },
                          this.props.activeItemKey == 'Cold Chain Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.coldchainNav}
                      >
                        Cold Chain Monitoring System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Water Quality Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey ==
                          'Water Quality Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Ionicons
                        name="ios-water"
                        style={[
                          styles.screenIcon,
                          { marginLeft: 12 },
                          this.props.activeItemKey ==
                            'Water Quality Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 18 },
                          this.props.activeItemKey ==
                            'Water Quality Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.waterQualityNav}
                      >
                        Water Quality Monitoring System
                  </Text>
                    </View>
                  )}
                {user.dashboards.findIndex(
                  d => d.title === 'Fixed Asset Tracking System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Fixed Asset Tracking System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                        name="map-marker-radius"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Fixed Asset Tracking System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Fixed Asset Tracking System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.assetTrackingNav}
                      >
                        Fixed Asset Tracking System
                  </Text>
                    </View>
                  )}
                {user.dashboards.findIndex(
                  d => d.title === 'Energy Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Energy Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                        name="map-marker-radius"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Energy Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Energy Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.energyNav}
                      >
                        Energy Monitoring System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Water Tank System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Water Tank System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                        name="fish"
                        style={[
                          styles.screenIcon,
                          this.props.activeItemKey == 'Water Tank System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                      />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Water Tank System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.tankNav}
                      >
                        Water Tank System
                  </Text>
                    </View>
                  )}

                <View
                  style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Environment Monitoring System'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                  onPress={this.envNav}
                >
                  <Icon2
                    name="user"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Environment Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      { marginLeft: 15 },
                      this.props.activeItemKey == 'Environment Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.envNav}
                  >
                    Environment Monitoring System
                </Text>
                </View>

                {user.dashboards.findIndex(
                  d => d.title === 'Tubewell Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Tubewell Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}
                      ></Image>
                      {/* <Icon1
                    name="background"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Tubewell Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  /> */}
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Tubewell Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.tubeNav}
                      >
                        Tubewell Monitoring System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Smart Highway Lighting System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Smart Highway Lighting System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      {/* <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}
                      ></Image> */}
                      <Icon3
                    name="traffic-light"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Smart Highway Lighting System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Smart Highway Lighting System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.smartLightNav}
                      >
                        Smart Highway Lighting System
                  </Text>
                    </View>
                  )}
                

                {user.dashboards.findIndex(
                  d => d.title === 'Humidity & Temperature Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                    name="water-percent"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Humidity & Temperature Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.HumidityTempNav}
                      >
                        Humidity and Temperature Monitoring System
                  </Text>
                    </View>
                  )}
                
                {user.dashboards.findIndex(
                  d => d.title === 'Security System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Security System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                    name="security"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Security System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Security System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.SecurityNav}
                      >
                        Security System
                  </Text>
                    </View>
                  )}

                {user.dashboards.findIndex(
                  d => d.title === 'Rectifier & Backup Battery Monitoring System',
                ) === -1 ? null : (
                    <View
                      style={[
                        styles.screenStyle,
                        this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                          ? styles.activeBackgroundColor
                          : null,
                      ]}
                    >
                      <Icon1
                    name="security"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                      <Text
                        style={[
                          styles.screenTextStyle,
                          { marginLeft: 15 },
                          this.props.activeItemKey == 'Rectifier & Backup Battery Monitoring System'
                            ? styles.selectedTextStyle
                            : null,
                        ]}
                        onPress={this.RectifierNav}
                      >
                       Rectifier And Backup Battery Monitoring System
                  </Text>
                    </View>
                  )}

                <View
                  style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Profile'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                >
                  <Icon2
                    name="user"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Profile'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      { marginLeft: 15 },
                      this.props.activeItemKey == 'Profile'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.navigateToScreen('Profile')}
                  >
                    Profile
                </Text>
                </View>

                <Divider
                  style={{
                    backgroundColor: '#acacac',
                    marginHorizontal: wp('4%'),
                    marginTop: hp('10%'),
                    marginBottom: hp('2%'),
                  }}
                />

                <View
                  style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Share'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                >
                  <Icon2
                    name="share"
                    style={[
                      styles.screenIcon,
                      this.props.activeItemKey == 'Share'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      { marginLeft: 15 },
                      this.props.activeItemKey == 'Share'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.navigateToScreen('Share')}
                  >
                    Tell a Friend
                </Text>
                </View>

                <View
                  style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'Help'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                >
                  <Ionicons
                    name="md-help-circle-outline"
                    style={[
                      styles.screenIcon,
                      { marginLeft: 11 },
                      this.props.activeItemKey == 'Help'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      { marginLeft: 16 },
                      this.props.activeItemKey == 'Help'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.navigateToScreen('Help')}
                  >
                    Help and Feedback
                </Text>
                </View>

                <Divider
                  style={{
                    backgroundColor: '#acacac',
                    marginHorizontal: wp('4%'),
                    marginTop: hp('1%'),
                    marginBottom: hp('0.5%'),
                  }}
                />

                <View
                  style={[
                    styles.screenStyle,
                    this.props.activeItemKey == 'SignOut'
                      ? styles.activeBackgroundColor
                      : null,
                  ]}
                >
                  <Ionicons
                    name="ios-log-out"
                    style={[
                      styles.screenIcon,
                      { marginLeft: 11 },
                      this.props.activeItemKey == 'SignOut'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                  />
                  <Text
                    style={[
                      styles.screenTextStyle,
                      { marginLeft: 16 },
                      this.props.activeItemKey == 'SignOut'
                        ? styles.selectedTextStyle
                        : null,
                    ]}
                    onPress={this.handleLogout}
                  >
                    Sign Out
                </Text>
                </View>
              </ScrollView>
              </View>
              </View>
            </View>
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.isLoading,
});

export default connect(mapStateToProps, { logout })(drawerContentComponents);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  headerContainer: {
    height: hp('25%'),
    marginTop: hp('0.2%'),
  },
  headerText: {
    color: colors.white,
    marginLeft: wp('5%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  headerText1: {
    color: colors.white,
    marginLeft: wp('5%'),
    marginBottom: hp('4%'),
    fontSize: hp('1.3%'),
  },
  screenContainer: {
    // flex:1,
    paddingTop: hp('3%'),
    // alignItems:'center',
    // backgroundColor:'red'
  },
  screenStyle: {
    height: hp('4.3%'),
    marginTop: hp('0.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('60%'),
    // backgroundColor:'#000'
  },
  screenTextStyle: {
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5f5f5f',
    fontFamily: fonts.primaryRegular,
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#4f44b6',
  },
  activeBackgroundColor: {
    backgroundColor: 'rgba(90, 129, 247, 0.4)',
  },
  screenIcon: {
    color: '#5f5f5f',
    fontSize: 12,
    marginLeft: 10,
  },
});
