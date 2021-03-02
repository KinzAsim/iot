import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import axios from 'axios';
import { fonts, colors } from '../../styles';
import { TextInput, Button, Dropdown } from '../../components';
import MultiSelect from 'react-native-multiple-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};

items = [
  {
    id: '1',
    name: 'Fuel Monitoring System'
  },
  {
    id: '2',
    name: 'Liquid Monitoring System'
  },
  {
    id: '3',
    name: 'Temperature Monitoring System'
  },
  {
    id: '4',
    name: 'CNC Monitoring System'
  },
  {
    id: '5',
    name: 'Cold Chain Monitoring System'
  }
]

export default class AuthScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,

    username: null,
    email: null,
    password: null,

    selected: -1,
    selectedValue: null,

    selectedItems : [],
    Ip: null,
    loading:false    
    
  }; 
  

  UNSAFE_componentWillMount() {

    const {navigation,isAuthenticated} = this.props;
    if (isAuthenticated)
    {
      navigation.navigate("App");
    }

    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
    axios.get('https:api.ipify.org?format=json').then((data) => {
      this.setState({
        Ip: data.data.ip
      })
    });
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  componentDidUpdate(nextProps) {
    const {error,navigation,isAuthenticated} = this.props;
    if(nextProps.Error !== ''){
      if(error.id === 'LOGIN_FAIL'){
        Alert.alert(
          'Log in Failed!',
          error.message,
          [            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
        this.props.clearErrors();
      }      
    }
    if (isAuthenticated) {
      navigation.navigate("App");          
    }
  }

  handeSubmit = () => {
    const{username, email, password,Ip} = this.state;
    if(this.state.formState == FORM_STATES.REGISTER){
      this.props.register(username, email, password);
      console.log('register');
    }
    else{
      this.props.login(email, password,Ip);
      this.setState({
        loading:true
      }); 
    }
    
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems});
  };

  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;
    const { selectedItems,loading } = this.state;

    return (
      
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
        <StatusBar
                    backgroundColor= "#3b35ac"
                    barStyle="light-content"
                />
          <View style={[styles.section, { paddingTop: hp('2%') }]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.logo,
                this.state.isKeyboardVisible && { height: hp('15%') },
                this.fadeIn(0),
              ]}
              source={require('../../../assets/images/IoT-Insights-Logo.png')}
            />
          </View>

          <Animated.View
            style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
            {this.state.formState === FORM_STATES.REGISTER && (
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => this.setState({ username: text })}
            />
            )}

            
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={text => this.setState({ email: text })}
              />
            

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
              onChangeText={text => this.setState({ password: text })}
            />

            <Animated.View
              style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
            >
              <Button
                bgColor={colors.secondary}
                textColor="white"
                rounded
                style={{ alignSelf: 'stretch', marginBottom: hp('5%')}}
                caption={
                  this.state.formState === FORM_STATES.LOGIN
                    ? 'Login'
                    : 'Register'
                }
                onPress={() => this.handeSubmit()}
              />

                <View>
                  <ActivityIndicator animating={loading} size="small" 
                      color={'#fff'} />
                </View>

              {!this.state.isKeyboardVisible && (
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.spring();
                    this.setState({
                      formState: isRegister
                        ? FORM_STATES.LOGIN
                        : FORM_STATES.REGISTER,
                    });
                  }}
                  style={{ paddingTop: 20, flexDirection: 'row' }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryRegular,
                    }}
                  >
                    {isRegister
                      ? 'Already have an account?'
                      : ""}
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryBold,
                      marginLeft: 5,
                    }}
                  >
                    {isRegister ? 'Login' : ''}
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 40 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  logo: {
    height: hp('20%'),
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
  
});
