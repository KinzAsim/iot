import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from '../../../components';
import CardFlip from 'react-native-card-flip';
import * as Animatable from 'react-native-animatable';
import DialogInput from 'react-native-dialog-input';
import { fonts, colors } from '../../../styles';
import { withNavigation } from 'react-navigation';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

const background = require("../../../../assets/images/threshold.png")

class ThresholdScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleArray: [],
            selectedModule: 0,
            selectedModuleValue: null,
            thresholdArrayUpper: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'],
            thresholdArrayLower: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100'],
            selectedThresholdUpper: -1,
            selectedThresholdLower: -1,
            selectedThresholdValueUpper: null,
            selectedThresholdValueLower: null,
            sensorIndex: null,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            dialogVisible5: false,
            dialogVisible6: false,
            dialogVisible7: false,
            dialogVisible8: false,
            dialogVisible9: false,

        }
    }
    async componentDidMount() {
        const { user, upper, sensors, navigation } = this.props;
        const { selectedModule } = this.state;

        const done = await this.props.getSensors(user.id);
        if (done === 'done') {

            console.log('hereeeeeeee')
            this.handleSensorData();
            this.props.getRunningTime(sensors[selectedModule]._id);
        }

        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getSensors(user.id);
            if (done === 'done') {

                console.log('hereeeeeeee')
                this.handleSensorData();
                this.props.getRunningTime(sensors[selectedModule]._id);
            }
        });
    }
    handleSensorData = () => {
        const { sensors } = this.props;
        const temp = [];
        sensors.map(s => {
            temp.push(s.name);
        })
        this.setState({
            moduleArray: temp,
            selectedModule: 0,
            selectedModuleValue: sensors[0].name
        })
    }
    handleSensorChange = (index, value) => {
        const { sensors } = this.props;
        const Index2 = sensors.findIndex(s => s.name === value);
        this.setState({
            selectedModule: index,
            selectedModuleValue: value,
            sensorIndex: Index2
        });
    }
    handleChangeUpper = (index, value) => {
        const { sensors } = this.props;
        const { selectedModule, selectedThresholdValue } = this.state;
        this.props.upperThresholds(value, sensors[selectedModule]._id, 'fill_u');
        this.setState({
            // selectedThreshold:index,
            selectedThresholdValue: value,
        });
    }
    handleChangeLower = (index, value) => {
        const { sensors } = this.props;
        const { selectedModule, selectedThresholdValueLower } = this.state;
        this.props.lowerThresholds(value, sensors[selectedModule]._id, 'fill_l');
        this.setState({
            // selectedThreshold:index,
            selectedThresholdValueLower: value,
        });
    }
    handleSubmit_Filter = () => {
        const { selectedModule } = this.state;
        const { sensors } = this.props;
        this.props.filterMaintenance(sensors[selectedModule]._id, sensors[selectedModule].maintanance.runningTime);
    }
    handleSubmit_Motor = () => {
        const { selectedModule } = this.state;
        const { sensors } = this.props;
        this.props.motorMaintenance(sensors[selectedModule]._id, sensors[selectedModule].maintanance.motorRunningTime);
    }
    showDialog1 = () => {
         this.setState({ dialogVisible1: true });
    };
    closeDialog1 = () => {
        this.setState({ dialogVisible1: false });
    };
    sendInput1 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.maintenanceThresholds(inputText, 't_capacity', sensors[selectedModule]._id);
        this.closeDialog1();
    };
    showDialog2 = () => {
        this.setState({ dialogVisible2: true });
    };
    closeDialog2 = () => {
        this.setState({ dialogVisible2: false });
    };
    sendInput2 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.lowerThresholds(inputText, sensors[selectedModule]._id, 'ph_l');
        this.closeDialog2();
    };
    showDialog3 = () => {
        this.setState({ dialogVisible3: true });
    };
    closeDialog3 = () => {
        this.setState({ dialogVisible3: false });
    };
    sendInput3 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.upperThresholds(inputText, sensors[selectedModule]._id, 'ph_u');
        this.closeDialog3();
    };
    showDialog4 = () => {
        this.setState({ dialogVisible4: true });
    };
    closeDialog4 = () => {
        this.setState({ dialogVisible4: false });
    };
    sendInput4 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.upperThresholds(inputText, sensors[selectedModule]._id, 'tds_u');
        this.closeDialog4();
    };
    showDialog5 = () => {
        this.setState({ dialogVisible5: true });
    };
    closeDialog5 = () => {
        this.setState({ dialogVisible5: false });
    };
    sendInput5 = (inputText) => {
        const { sensors } = this.props;
        console.log('dialogBox', sensors);
        const { selectedModule } = this.state;
        this.props.lowerThresholds(inputText, sensors[selectedModule]._id, 'tds_l');
        this.closeDialog5();
    };
    showDialog6 = () => {
        this.setState({ dialogVisible6: true });
    };
    closeDialog6 = () => {
        this.setState({ dialogVisible6: false });
    };
    sendInput6 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.lowerThresholds(inputText, sensors[selectedModule]._id, 'Ia_l');
        this.closeDialog6();
    };
    showDialog7 = () => {
        this.setState({ dialogVisible7: true });
    };
    closeDialog7 = () => {
        this.setState({ dialogVisible7: false });
    };
    sendInput7 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.maintenanceThresholds(inputText, 'm_maintenance', sensors[selectedModule]._id);
        this.closeDialog7();
    };
    showDialog8 = () => {
        this.setState({ dialogVisible8: true });
    };
    closeDialog8 = () => {
        this.setState({ dialogVisible8: false });
    };
    sendInput8 = (inputText) => {
        const { sensors } = this.props;
        const { selectedModule } = this.state;
        this.props.maintenanceThresholds(inputText, 'w_maintenance', sensors[selectedModule]._id);
        this.closeDialog8();
    };

    // manageControl = async (auto) => {
    //     const { sensors } = this.props;
    //     const { selectedModule } = this.state;
    //     const done = await this.props.motorMode(sensors[selectedModule]._id, auto);
    //     console.log('haihh', done)
    //     if (done === 'done') {
    //         this.card.flip();
    //     }
    // }

    handleMotorControl = () => {
        const { selectedModule } = this.state;
        const { sensors } = this.props;
        if (sensors[selectedModule].auto === false) {
            Alert.alert(
                'Alert!',
                'Automatic switching would be turned off, you have to turn off motor manually.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.motorMode(sensors[selectedModule]._id, true);
                        },
                    },
                ],
                { cancelable: false },
            );
        }
        else if (sensors[selectedModule].auto === true) {
            this.props.motorMode(sensors[selectedModule]._id, false);
        }
        else {
            console.log('Error');
        }
    }



    render() {
        const { upper, user, sensors, sensorsLoading, filter, motorLoading } = this.props;
        const { moduleArray, selectedModule, selectedModuleValue, thresholdArrayLower, thresholdArrayUpper, selectedThresholdUpper, selectedThresholdLower } = this.state;
        console.log('thresholdasdjasgdj', sensors);

        if (selectedModuleValue === null && selectedModule === -1) {
            return (
                <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Bars size={15} color={colors.primary} />
                </View>
            );
        }

        return (
            <ScrollView style={{ flex: 1 }}
                keyboardShouldPersistTaps="handled">
                <Dropdown
                    placeholder='Select Module...'
                    style={styles.Dropdown}
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => this.handleSensorChange(index, value)}
                />
                {sensorsLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Bars size={15} color={colors.primary} />
                    </View>
                ) : (
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('2%'), alignSelf: 'center' }}>TANK SYSTEM</Text>
                            <Divider style={{ backgroundColor: '#000', width: wp('100%') }} />
                            <Animatable.View
                                animation="bounceInLeft"
                                iterationCount={1}>
                                <View style={{ flex: 0.18, backgroundColor: '#98bbf5', marginTop: hp('2%'), borderTopRightRadius: 40, borderBottomEndRadius: 40, marginRight: hp('5%') }}>
                                    <Text style={{ color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold', fontSize: hp('2%'), marginTop: hp('1%') }}>Tank Lower Threshold</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp('1%') }}>
                                        <Text style={{ color: '#fff', marginLeft: wp('3%'), fontSize: hp('3.5%'), marginTop: hp('1%') }}>{sensors[selectedModule].fillLevel_lwrLmt}%</Text>
                                        {/* <TouchableOpacity style={{ height: hp('2%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center' }}>
                                        <Text style={{ color: '#fff', alignSelf: 'center', color: '#EB5345', fontWeight: 'bold' }}>Set Threshold</Text>
                                    </TouchableOpacity> */}
                                        <Dropdown
                                            placeholder='Set Threshold'
                                            color='#0564a8'
                                            style={{ width: wp('35%'), height: hp('5%'), marginTop: hp('1%'), borderWidth: 0.2 }}
                                            items={thresholdArrayLower}
                                            selectedIndex={selectedThresholdLower}
                                            onSelect={(index, value) => this.handleChangeLower(index, value)}
                                        />
                                        <View style={[styles.IconView, { alignSelf: 'center', backgroundColor: '#0564a8' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                    </View>
                                </View>
                            </Animatable.View>

                            
                            <Animatable.View
                                animation="bounceInRight"
                                iterationCount={1}>
                            <View style={{ flex: 0.18, backgroundColor: '#fd8f7a', marginTop: hp('2%'), borderTopLeftRadius: 40, borderBottomLeftRadius: 40, marginLeft: hp('5%') }}>
                                <Text style={{ color: '#fff', marginLeft: wp('6%'), fontWeight: 'bold', fontSize: hp('2%'), marginTop: hp('1%') }}>Tank Upper Threshold</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp('1%') }}>
                                    <Text style={{ color: '#fff', marginLeft: wp('8%'), fontSize: hp('3.5%'), marginTop: hp('1%') }}>{sensors[selectedModule].fillLevel_upperLmt}%</Text>
                                    {/* <TouchableOpacity style={{ height: hp('2%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center' }}
                                    onPress={() => this.showDialog9()}>
                                        <Text style={{ color: '#fff', alignSelf: 'center', color: '#419CDE', fontWeight: 'bold' }}>Set Threshold</Text>
                                    </TouchableOpacity> */}
                                    <Dropdown
                                        placeholder='Set Threshold'
                                        color='#e03e1f'
                                        style={{ width: wp('35%'), height: hp('5%'), marginTop: hp('1%'), borderWidth: 0.2 }}
                                        items={thresholdArrayUpper}
                                        selectedIndex={selectedThresholdUpper}
                                        onSelect={(index, value) => this.handleChangeUpper(index, value)}
                                    />
                                    <View style={[styles.IconView, { backgroundColor: '#e03e1f' }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </View>
                            </Animatable.View>

                            <Animatable.View
                                animation="bounceInLeft"
                                iterationCount={1}>
                            <View style={{ flex: 0.18, backgroundColor: '#20d6c4', marginTop: hp('2%'), borderTopRightRadius: 40, borderBottomEndRadius: 40, marginRight: hp('5%') }}>
                                <Text style={{ color: '#fff', marginLeft: wp('2%'), fontWeight: 'bold', fontSize: hp('2%'), marginTop: hp('1%') }}>Tank Capacity (Liters)</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp('1%') }}>
                                    <Text style={{ color: '#fff', marginLeft: wp('3%'), fontSize: hp('3.5%'), marginTop: hp('1%') }}>{sensors[selectedModule].liters} </Text>
                                    <TouchableOpacity style={{ borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginBottom: hp('1%') }}
                                        onPress={() => this.showDialog1()}>
                                        <Text style={{
                                            color: '#fff', alignSelf: 'center', color: '#07786D', fontWeight: 'bold', borderRadius: 5, width: wp('35%'),
                                            padding: 7, marginTop: hp('1%'), borderWidth: 0.2, paddingVertical: hp('1%')
                                        }}>
                                            Set Threshold
                                                </Text>
                                        {/* borderColor:'#07786D', borderWidth:0.0, */}
                                    </TouchableOpacity>
                                    <DialogInput isDialogVisible={this.state.dialogVisible1}
                                        title={"Set Threshold"}
                                        message={"Enter Value to set Tank Capacity"}
                                        hintInput={"Enter Threshold"}
                                        submitInput={(inputText) => { this.sendInput1(inputText) }}
                                        closeDialog={() => this.closeDialog1()}>
                                    </DialogInput>
                                    <View style={[styles.IconView, { backgroundColor: '#07786D' }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </View>
                            </Animatable.View>

                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('4%'), alignSelf: 'center' }}>WATER QUALITY</Text>
                            <Divider style={{ backgroundColor: '#000', width: wp('100%') }} />
                            <View style={{ flex: 0.5, flexDirection: 'row', marginLeft: wp('3%') }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('33%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>Ph Lower Threshold</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('5%'), marginRight: wp('2%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('3.5%'), alignSelf: 'center', marginTop: hp('1.5%') }}>{sensors[selectedModule].ph_lwrLmt}</Text>
                                        <TouchableOpacity style={{ height: hp('3%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginTop: hp('3%') }}
                                            onPress={() => this.showDialog2()}>
                                            <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.1%'), fontSize: hp('2%') }}>
                                                Set Threshold</Text>
                                        </TouchableOpacity>
                                        <DialogInput isDialogVisible={this.state.dialogVisible2}
                                            title={"Set Threshold"}
                                            message={"Enter Value to set Lower Threshold"}
                                            hintInput={"Enter Threshold"}
                                            submitInput={(inputText) => { this.sendInput2(inputText) }}
                                            closeDialog={() => this.closeDialog2()}>
                                        </DialogInput>
                                    </Card>

                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('32.5%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>Ph Upper Threshold</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('5%'), marginRight: wp('2%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('3.5%'), alignSelf: 'center', marginTop: hp('2%') }}>
                                            {sensors[selectedModule].ph_upperLmt}</Text>
                                        <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginTop: hp('2%') }}
                                            onPress={() => this.showDialog3()}>
                                            <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.1%'), fontSize: hp('2%') }}>
                                                Set Threshold</Text>
                                        </TouchableOpacity>
                                        <DialogInput isDialogVisible={this.state.dialogVisible3}
                                            title={"Set Threshold"}
                                            message={"Enter Value to set Upper Threshold"}
                                            hintInput={"Enter Threshold"}
                                            submitInput={(inputText) => { this.sendInput3(inputText) }}
                                            closeDialog={() => this.closeDialog3()}>
                                        </DialogInput>
                                    </Card>

                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('33%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold', marginLeft: wp('4%') }}> Filter Maintenance Threshold</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('5%'), marginRight: wp('2%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('3.5%'), alignSelf: 'center', marginTop: hp('2%') }}>{sensors[selectedModule].waterMaintenance} Days</Text>
                                        <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginTop: hp('2%') }}
                                            onPress={() => this.showDialog8()}>
                                            <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.5%'), fontSize: hp('2%') }}>
                                                Set Threshold</Text>
                                        </TouchableOpacity>
                                        <DialogInput isDialogVisible={this.state.dialogVisible8}
                                            title={"Set Threshold"}
                                            message={"Enter Value to set threshold"}
                                            hintInput={"Enter Threshold"}
                                            submitInput={(inputText) => { this.sendInput8(inputText) }}
                                            closeDialog={() => this.closeDialog8()}>
                                        </DialogInput>
                                    </Card>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('26%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>TDS Lower Threshold</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('2%'), marginLeft: wp('6%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('4%'), alignSelf: 'center', marginLeft: wp('2%') }}>{sensors[selectedModule].tds_lwrLmt}</Text>
                                        <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginTop: hp('1.5%') }}
                                            onPress={() => this.showDialog5()}>
                                            <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.1%'), fontSize: hp('2%') }}>
                                                Set Threshold</Text>
                                        </TouchableOpacity>
                                        <DialogInput isDialogVisible={this.state.dialogVisible5}
                                            title={"Set Threshold"}
                                            message={"Enter Value to set Lower Threshold"}
                                            hintInput={"Enter Threshold"}
                                            submitInput={(inputText) => { this.sendInput5(inputText) }}
                                            closeDialog={() => this.closeDialog5()}>
                                        </DialogInput>
                                    </Card>

                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('26%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>TDS Upper Threshold</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('2%'), marginLeft: wp('6%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('4%'), alignSelf: 'center', marginLeft: wp('2%') }}>{sensors[selectedModule].tds_upperLmt}</Text>
                                        <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', marginTop: hp('1.5%') }}
                                            onPress={() => this.showDialog4()}>
                                            <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.1%'), fontSize: hp('2%') }}>
                                                Set Threshold</Text>
                                        </TouchableOpacity>
                                        <DialogInput isDialogVisible={this.state.dialogVisible4}
                                            title={"Set Threshold"}
                                            message={"Enter Value to set Upper Threshold"}
                                            hintInput={"Enter Threshold"}
                                            submitInput={(inputText) => { this.sendInput4(inputText) }}
                                            closeDialog={() => this.closeDialog4()}>
                                        </DialogInput>

                                    </Card>



                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('22%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>Filter Maintenance Log</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('2%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('3%'), marginLeft: wp('6%'), backgroundColor: '#0055a6' }]}>
                                            <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                        </View>
                                        <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('38%'), alignSelf: 'center', marginTop: hp('1.5%') }}
                                            onPress={() => this.handleSubmit_Filter()}>
                                            <Text style={{ color: '#fff', alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', fontSize: hp('2%') }}>
                                                LOG MAINTENANCE</Text>
                                        </TouchableOpacity>
                                    </Card>

                                    <Card containerStyle={[styles.cardMainContainer, { marginLeft: wp('3%'), height: hp('22%'), marginBottom: hp('3%') }]}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000', alignSelf: 'center', marginTop: hp('2%'), fontWeight: 'bold' }}>Filter Running Time</Text>
                                        <Divider style={{ backgroundColor: '#000', marginHorizontal: wp('4%') }} />
                                        <View style={[styles.IconView, { alignSelf: 'center', marginTop: hp('3%'), marginLeft: wp('6%'), backgroundColor: '#0055a6' }]}>
                                            <Icon1 name='alarm' style={[styles.Icon, { alignSelf: 'center' }]}></Icon1>
                                        </View>
                                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: hp('3.5%'), alignSelf: 'center', marginBottom: hp('1.5%') }}>{sensors[selectedModule].maintanance.runningTime}Mins</Text>
                                        {/* <View style={{ marginTop: hp('2%'), alignSelf: 'center' }}>
                                        </View> */}
                                    </Card>
                                </View>
                            </View>

                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: hp('2.5%'), marginTop: hp('4%'), alignSelf: 'center' }}>HYDRO PUMP</Text>
                            <Divider style={{ backgroundColor: '#000', width: wp('100%') }} />

                            <Card containerStyle={{ borderRadius: 25 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>LINE CURRENT LOWER THRESHOLD</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: hp('3.5%'), marginTop: hp('2%'), color: '#6d2aa8', fontWeight: 'bold' }}>{sensors[selectedModule].I_lwrLmt}</Text>
                                    <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', borderWidth: 0.5 }}
                                        onPress={() => this.showDialog6()}>
                                        <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.5%'), fontSize: hp('2%') }}>
                                            Set Threshold</Text>
                                    </TouchableOpacity>
                                    <DialogInput isDialogVisible={this.state.dialogVisible6}
                                        title={"Set Threshold"}
                                        //message={"Enter Value to set Threshold"}
                                        hintInput={"Enter Value of Threshold"}
                                        submitInput={(inputText) => { this.sendInput6(inputText) }}
                                        closeDialog={() => this.closeDialog6()}>
                                    </DialogInput>
                                    <View style={[styles.IconView, { backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </Card>

                            <Card containerStyle={{ borderRadius: 25 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>HYDRO PUMP MAINTENANCE LOG</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('40%'), alignSelf: 'center', borderWidth: 0.5 }}
                                        onPress={() => this.handleSubmit_Motor()}>
                                        <Text style={{ color: '#fff', alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.5%') }}>LOG MAINTENANCE</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.IconView, { backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </Card>

                            <Card containerStyle={{ borderRadius: 25 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>HYDRO PUMP MAINTENANCE THRESHOLD</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: hp('3.5%'), marginTop: hp('2%'), color: '#6d2aa8', fontWeight: 'bold' }}>{sensors[selectedModule].motorMaintenance} Hours</Text>
                                    <TouchableOpacity style={{ height: hp('4%'), borderRadius: 20, width: wp('30%'), alignSelf: 'center', borderWidth: 0.5, marginTop: hp('0.8%') }}
                                        onPress={() => this.showDialog7()}>
                                        <Text style={{ alignSelf: 'center', color: '#0055a6', fontWeight: 'bold', marginTop: hp('0.5%'), fontSize: hp('2%') }}>
                                            Set Threshold</Text>
                                    </TouchableOpacity>
                                    <DialogInput isDialogVisible={this.state.dialogVisible7}
                                        title={"Reset Threshold"}
                                        message={"Do you want to reset threshold?"}
                                        hintInput={"HINT INPUT"}
                                        submitInput={(inputText) => { this.sendInput7(inputText) }}
                                        closeDialog={() => this.closeDialog7()}>
                                    </DialogInput>
                                    <View style={[styles.IconView, { backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </Card>

                            <Card containerStyle={{ borderRadius: 25 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>HYDRO PUMP RUNNING TIME</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: hp('3.5%'), marginTop: hp('2%'), color: '#6d2aa8', fontWeight: 'bold' }}>{sensors[selectedModule].maintanance.motorRunningTime} Mins</Text>

                                    <View style={[styles.IconView, { backgroundColor: '#6d2aa8', marginTop: hp('0.1') }]}>
                                        <Image source={background} style={{ height: hp('3%'), width: wp('6%') }}></Image>
                                    </View>
                                </View>
                            </Card>

                            <Card containerStyle={{ borderRadius: 25, marginBottom: hp('2%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}> MODE</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {sensors[selectedModule].auto === true ? (
                                        <Text style={{ fontSize: hp('2.5%'), marginTop: hp('2%'), color: 'green', fontWeight: 'bold' }}>Hydro Pump Control-Automatic</Text>
                                    ) : (
                                            <Text style={{ fontSize: hp('2.5%'), marginTop: hp('2%'), color: 'red', fontWeight: 'bold' }}>Hydro Pump Control-Manual</Text>
                                        )}
                                    <TouchableOpacity style={[styles.IconView, {
                                        height: hp('7.5%'), width: wp('14%'), backgroundColor: 'transparent', marginTop: hp('0.5%')
                                        , alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: wp('3%')
                                    }]} onPress={() => this.handleMotorControl()}>
                                        {sensors[selectedModule].auto === true ? (
                                            <Icon2 name='power-off' style={{
                                                backgroundColor: 'green', height: hp('7.5%'), width: wp('14%'), borderRadius: hp('5%')
                                                , fontSize: hp('3%'), color: '#fff', paddingHorizontal: wp('4.5%'), paddingVertical: hp('2%')
                                            }}></Icon2>
                                        ) : (
                                                <Icon2 name='power-off' style={{
                                                    backgroundColor: 'red', height: hp('7.5%'), width: wp('14%'), borderRadius: hp('5%')
                                                    , fontSize: hp('3%'), color: '#fff', paddingHorizontal: wp('4.5%'), paddingVertical: hp('2%')
                                                }}></Icon2>
                                            )}
                                    </TouchableOpacity>

                                    {/* <CardFlip style={[styles.IconView, { height: hp('7.5%'), width: wp('14%'), backgroundColor: 'transparent' }]} ref={(card) => this.card = card}>
                                        <TouchableOpacity style={[styles.IconView, { height: hp('7.5%'), width: wp('14%'), backgroundColor: 'green', marginTop: hp('0%') }]}
                                         onPress={() => this.handleMotorControl()}>
                                            <Icon2 name='power-off' style={[styles.Icon,{backgroundColor: 'green'}]}></Icon2>
                                        </TouchableOpacity >
                                        <TouchableOpacity style={[styles.IconView, { height: hp('7.5%'), width: wp('14%'), backgroundColor: 'red', marginTop: hp('0%') }]} 
                                        onPress={() => this.handleMotorControl()}>
                                            <Icon2 name='power-off' style={[styles.Icon,{ backgroundColor: 'red'}]}></Icon2>
                                        </TouchableOpacity>
                                    </CardFlip>
                                    {motorLoading ? (
                                        <View style={{ backgroundColor: 'transparent' }}>
                                            <ActivityIndicator size='small' color={'#000'} />
                                        </View>
                                    ) : (
                                            null
                                        )} */}

                                </View>
                            </Card>
                        </View>
                    )}

            </ScrollView>
        );
    }
}

export default withNavigation(ThresholdScreen);

const styles = StyleSheet.create({
    cardMainContainer: {
        width: wp('40%'),
        height: hp('32.5%'),
        marginLeft: wp('0.1%'),
        padding: 0,
        elevation: 5,
        borderRadius: 20,
        borderWidth: 0
    },
    card: {
        color: '#000',
        fontSize: 12
    },
    IconView: {
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: '#EB5345',
        alignItems: 'center',
        marginRight: wp('6%'),
        marginBottom: hp('1%'),
        justifyContent: 'center',
        shadowOffset: { width: wp('0%'), height: hp('0%') },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: wp('2%'),
        elevation: 10,
    },
    Icon: { fontSize: hp('2.5%'), marginBottom: hp('0.5%'), color: 'white' },
    Dropdown: { width: wp('80%'), height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%') },
})