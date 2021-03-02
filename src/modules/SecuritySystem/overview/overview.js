import React from 'react';
import { View, Text, StyleSheet, Image, Animated, StatusBar, ImageBackground, YellowBox, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown } from '../../../components';
import { Card, Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { FlatGrid } from 'react-native-super-grid';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { fonts, colors } from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import DialogInput from 'react-native-dialog-input';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation } from 'react-navigation';

// YellowBox.ignoreWarnings([' undefined is not an object']);
const image = require("../../../../assets/images/humidity.jpg")
const iconThreshold = require("../../../../assets/images/threshold.png");

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleArray: [],
            selectedModule: -1,
            selectedModuleValue: null,
            segmentIndex: false,
        }
    }
    handleViewRef1 = ref => this.view1 = ref;
    handleViewRef2 = ref => this.view2 = ref;
    animate1 = () => this.view1.fadeInUp(2000).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
    animate2 = () => this.view2.fadeInUp(2000).then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
    async componentDidMount() {
        const { user ,module,navigation} = this.props;
        const done = await this.props.getModule(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
        if (this.view1 !== null && this.view2 !== null ) {
            this.animate1();
            this.animate2();
        }
        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getModule(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
            if (this.view1 !== null && this.view2 !== null) {
                this.animate1();
                this.animate2();
            }
        });
    }
    handleSensorData = () => {
        const { module } = this.props;
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: module[0].name
        })
    }
    handleSensorChange = (index, value) => {
        const { module } = this.props;
        const Index2 = module.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            segmentIndex: Index2
        });
    }

    render() {
        const { moduleArray, selectedModule, selectedModuleValue } = this.state;
        const {user, module ,moduleLoading} = this.props;
        console.log(module)

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Bubbles size={15} color={colors.primary} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Dropdown
                    placeholder='Select Module...'
                    style={styles.Dropdown}
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => this.handleSensorChange(index, value)}
                />
                {moduleLoading ? (
                     <View
                     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                     <Bubbles size={15} color={colors.primary} />
                    </View>
                ):(
                    <ScrollView  style={{  flex: 1,paddingHorizontal:5 }}>
                    <View style={{ flex: 1, marginTop: hp('3%') }}>
                        <Text style={styles.textView}>SECURITY:</Text>
                        <Animatable.View ref={this.handleViewRef1}>
                        <Card containerStyle={styles.card}>
                            <Text style={styles.font}>DOOR STATUS</Text>
                            <Divider />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                {module[selectedModule].door_status == 0 ? (
                                     <Icon3 name='door-closed' style={[styles.Icon,{color:'#388E3C'}]}></Icon3>
                                ):(
                                     <Icon3 name='door-open' size={10} style={[styles.Icon,{color:'red'}]}></Icon3>
                                )}                               
                                {module[selectedModule].door_status == 0 ? (
                                    <Text style={styles.Text}>Door Closed</Text>
                                ) : (
                                        <Text style={[styles.Text,{color:'#388E3C'}]}>Door Open</Text>
                                    )}
                            </View>
                        </Card>
                        </Animatable.View>
                    </View>

                    <View style={{ flex: 0.1, marginTop: hp('4%'), marginBottom: hp('2%') }}>
                        <Text style={styles.textView}>SMOKE ALARM:</Text>
                        <Animatable.View ref={this.handleViewRef2}>
                        <Card containerStyle={styles.card}>
                            <Text style={styles.font}>SMOKE ALARM STATUS</Text>
                            <Divider />
                            <Animatable.View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                {module[selectedModule].alarm === false ? (
                                     <Icon4 name='bell-plus-outline' style={styles.Icon1}></Icon4>
                                ):(
                                    <Icon4 name='bell-plus-outline' style={styles.Icon2}></Icon4>
                                )}                               
                                {module[selectedModule].alarm === true ? (
                                    <Animatable.Text animation="wobble" iterationCount="infinite"
                                    style={[styles.Text,{color:'#578300'}]}>Active</Animatable.Text>
                                ) : ( 
                                        <Text animation="wobble" iterationCount="infinite"
                                            style={styles.Text}>Non-Active</Text>
                                    )}
                            </Animatable.View>
                        </Card>
                        </Animatable.View>
                    </View>
                </ScrollView>
                )}
            </View>
        );
    }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
    Dropdown: { width: wp('90%'), height: hp('4%'), color: '#fff', marginLeft: wp('5%'), marginTop: hp('3%') },
    Icon: { fontSize: hp('5.5%'), color: '#795548', marginTop: hp('7%'), alignSelf: 'flex-end' },
    Icon1: { fontSize: hp('5.5%'), color: '#9E9E9E', marginTop: hp('7%'), alignSelf: 'flex-end' },
    Icon2: { fontSize: hp('5.5%'), color: '#388E3C', marginTop: hp('7%'), alignSelf: 'flex-end' },
    //#795548 #578300
    IconView: {
        backgroundColor: '#1976D2',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('4%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    font:{ fontWeight: 'bold', fontSize: hp('2%'), alignSelf: 'center' },
    Text:{ fontSize: hp('3.5%'), marginTop: hp('-5%'), color: 'red', fontWeight: 'bold', alignSelf: 'flex-start' },
    textView:{ fontWeight: 'bold', fontSize: hp('2.5%'), alignSelf: 'flex-start' ,marginLeft:wp('6%'),marginBottom:hp('-1%')},
    card:{ marginLeft:wp('6%'),width: wp('85%'), height: hp('27%') ,paddingHorizontal:20},
    container: { flex: 1, backgroundColor: '#E0E0E0', },
    imageContainer: { height: '30%', },
    TextView: { marginTop: hp('5%'), fontSize: hp('4.5%'), fontWeight: 'bold' }
})