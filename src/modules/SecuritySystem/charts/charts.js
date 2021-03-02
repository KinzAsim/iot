import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import {  Bars, Bubbles } from 'react-native-loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    VictoryPie,
    VictoryChart,
    VictoryCandlestick,
    VictoryLine,
    VictoryBoxPlot,
    VictoryBar,
    VictoryTheme,
    VictoryAxis
} from 'victory-native';
import { useDispatch, useSelector } from 'react-redux';
import {getModule,getCharts} from '../../../redux/actions/securityAction';

const ChartsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const module = useSelector(state => state.security.module);
    const charts = useSelector(state => state.security.charts);
    const chartsLoading = useSelector(state => state.security.chartsLoading);
    const highest = useSelector(state => state.security.highest);
    const dispatch = useDispatch();

    const [moduleArray, setModuleArray] = useState([]);
    const [type, setType] = useState([
        'Door Status Charts',
        'Smoke Alarm Charts']);
    const [range,setRange] = useState(['Past Week', 'Past Month', 'Year Chart']);
    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [selectedType, setSelectedType] = useState(-1);
    const [selectedTypeValue, setSelectedTypeValue] = useState(null);
    const [selectedRange, setSelectedRange] = useState(0);
    const [selectedRangeValue, setSelectedRangeValue] = useState('Past Week');

    useEffect(()=>{
        handleSegmentData();             
    },[]);

    const handleSegmentData = async () => {
        const data = await dispatch(getModule(user.id));
        if (data === 'done') {
            handleSensorData();
        }       
    }
    const handleSensorData = () => {
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(module[0].name);
    }
    const handleModuleChange = (index, value) => {
        setSelectedModule(index);
        setSelectedModuleValue(value);
        getChartData(index,selectedTypeValue,selectedRangeValue);
    }
    const handleTypeChange =  (index, value) => {
        setSelectedType(index);
        setSelectedTypeValue(value);
        getChartData(selectedModule,value,selectedRangeValue);
    }
    const handleRangeChange =  (index, value) => {
        setSelectedRange(index);
        setSelectedRangeValue(value);
        getChartData(selectedModule,selectedTypeValue,value);
    }
    const  getChartData = (moduleIndex, type, range) => {       
        let range2 = 'week';
        let type2 = 'Door Status Charts';

        if (type === 'Door Status Charts') {
            type2 = 'door_status'
        }
        else if (type === 'Smoke Alarm Charts') {
            type2 = 'alarm'
        }

        if (range === 'Past Week') {
            range2 = 'week'
        }
        else if (range === 'Past Month') {
            range2 = 'month'
        }
        else if (range === 'Year Chart') {
            range2 = 'year'
        }
        //console.log('module',module[module]._id, type2,range2)
        if (module[moduleIndex] !== undefined) {
            dispatch(getCharts(type2,range2,module[moduleIndex]._id));
        }
    };

    let width = null;
    switch (selectedRangeValue) {
        case 'Past Week':
            width = wp('125%');
            break;
        case 'Past Month':
            width = wp('460%');
            break;
        case 'Year Chart':
            width = wp('200%');
            break;
    }
    return (
        <View style={{flex:1}}>
            <Dropdown
                placeholder = "Select Sensor"
                style={{ width: wp('95%'), height: hp('4.5%'), alignSelf: 'center', marginTop: hp('2%')}}
                items={moduleArray}
                selectedIndex={selectedModule}
                onSelect={(index, value) => handleModuleChange(index, value)}
            />
            <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
            <Dropdown
                placeholder = 'Select Chart Type...'
                style = {styles.Dropdown1}
                items={type}
                selectedIndex={selectedType}
                onSelect={(index, value) => handleTypeChange(index, value)}
            />
            <Dropdown
                placeholder = 'Select Chart Range...'
                style = {styles.Dropdown}
                items={range}
                selectedIndex={selectedRange}
                onSelect={(index, value) => handleRangeChange(index, value)}
            />
            </View>

            {chartsLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Bubbles size={15} color={colors.primary} />
                    </View>
                ) : (
                        <ScrollView horizontal style={styles.background}>
                            {selectedTypeValue === 'Door Status Charts'  || selectedTypeValue === 'Smoke Alarm Charts' ? (
                                    <ScrollView horizontal style={styles.chartView}>
                                        <VictoryChart
                                            width={width}
                                            height={hp('55%')}
                                            theme={VictoryTheme.pie}
                                            domainPadding={{ x: 10, y: 70 }}
                                            padding={50}
                                            domain={{ y: [0, highest] }}
                                        >
                                            <VictoryAxis
                                                dependentAxis
                                                style={{
                                                    axis: { stroke: '#756f6a' },
                                                    axisLabel: styles.AxisLabel,
                                                    grid: {
                                                        stroke: ({ tick }) => (tick > 0.5 ? 'red' : '#e6e6e6'),
                                                    },
                                                    ticks: { stroke: 'grey', size: 5 },
                                                    tickLabels: styles.TickLabels,
                                                }}
                                            />
                                            <VictoryAxis
                                                style={{
                                                    axis: { stroke: '#756f6a' },
                                                    axisLabel: styles.AxisLabel,
                                                    // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                                                    ticks: { stroke: 'grey', size: 2 },
                                                    tickLabels: styles.TickLabels,
                                                }}
                                            />
                                            <VictoryLine
                                                data={charts}
                                                interpolation="natural"
                                                style={{
                                                    data: {
                                                        stroke: 'red',
                                                        strokeWidth: 1.5,
                                                        strokeLinecap: 'round',
                                                    },
                                                }}
                                                animate={{
                                                    duration: 2000,
                                                    onLoad: { duration: 1500 },
                                                }}
                                            />
                                        </VictoryChart>
                                    </ScrollView>
                                    ) : (
                                        <View style={styles.TextView}>
                                            <Text style={styles.Text}>Please Select Chart Type</Text>
                                        </View>
                                    )}
                        </ScrollView>
                    )}
        </View>
    ); 
}

export default ChartsScreen;

const styles= StyleSheet.create({
    Dropdown: { width: wp('44%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    Dropdown1: { width: wp('50%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    AxisLabel: { fontSize: hp('5%'), padding: wp('10%') },
    TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') ,color:'red'},
    background: { backgroundColor: '#f1f1f8', flex: 1, paddingHorizontal: hp('0%'), },
    TextView: { alignItems: 'center', justifyContent: 'center', marginLeft: wp('30%'), },
    Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
    chartView: { backgroundColor: colors.white, paddingHorizontal: wp('2%'), paddingVertical: hp('5%') },
})