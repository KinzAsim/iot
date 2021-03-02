/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Bars } from 'react-native-loader';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';
import { getSensors, getChartData } from '../../../redux/actions/envActions';

// eslint-disable-next-line arrow-body-style
const ChartsScreen = props => {
  const [ModuleArray, setModuleArray] = useState([]);
  const [TypeArray, setTypeArray] = useState([
    'PM 1 CHART',
    'PM 2.5 CHART',
    'PM 10 CHART',
  ]);
  const [RangeArray, setRangeArray] = useState([
    'Past Week',
    'Past Month',
    'Year Chart',
  ]);
  const [SelectedModule, setSelectedModule] = useState(-1);
  const [SelectedModuleValue, setSelectedModuleValue] = useState(null);
  const [SelectedType, setSelectedType] = useState(-1);
  const [SelectedTypeValue, setSelectedTypeValue] = useState(null);
  const [SelectedRange, setSelectedRange] = useState(0);
  const [SelectedRangeValue, setSelectedRangeValue] = useState('Past Week');
  const [width, setWidth] = useState(null);

  const dispatch = useDispatch();
  const { navigation } = props;

  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.env.sensors);
  const charts = useSelector(state => state.env.charts);
  const chartsLoading = useSelector(state => state.env.chartsLoading);
  const highest = useSelector(state => state.env.highest);

  useEffect(() => {
    dispatch(getSensors(user.id));
    handleSensorData();

    navigation.addListener('didFocus', async () => {
      dispatch(getSensors(user.id));
      handleSensorData();
    });
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    // eslint-disable-next-line array-callback-return
    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    setModuleArray(temp);
    setSelectedModule(0);
    setSelectedModuleValue(name);
  };

  const handleSensorChange = (index, value) => {
    setSelectedModule(index);
    setSelectedModuleValue(value);

    dispatch(ChartData(SelectedTypeValue, SelectedRangeValue, index));
  };

  const handleTypeChange = (index, value) => {
    setSelectedType(index);
    setSelectedTypeValue(value);

    ChartData(value, SelectedRangeValue, SelectedModule);
  };

  const handleRangeChange = (index, value) => {
    setSelectedRange(index);
    setSelectedRangeValue(value);

    ChartData(SelectedTypeValue, value, SelectedModule);
  };

  const ChartData = (type, range, module) => {
    let range2 = 'week';
    let type2 = 'pm1';

    // eslint-disable-next-line default-case
    switch (type) {
      case 'PM 1 CHART':
        type2 = 'pm1';
        break;
      case 'PM 2.5 CHART':
        type2 = 'pm2_5';
        break;
      case 'PM 10 CHART':
        type2 = 'pm10';
        break;
    }

    // eslint-disable-next-line default-case
    switch (range) {
      case 'Past Week':
        range2 = 'week';
        setWidth(wp('125%'));
        break;
      case 'Past Month':
        range2 = 'month';
        setWidth(wp('460%'));
        break;
      case 'Year Chart':
        range2 = 'year';
        setWidth(wp('200%'));
        break;
    }
    dispatch(getChartData(type2, range2, sensors[module]._id));
  };

  // switch (SelectedRangeValue) {
  //   case 'Past Week':
  //     setWidth(wp('125%'));
  //     break;
  //   case 'Past Month':
  //     setWidth(wp('460%'));
  //     break;
  //   case 'Year Chart':
  //     setWidth(wp('200%'));
  //     break;
  // }

  // return (
  //   <View>
  //     <Text>Charts Screen</Text>
  //   </View>
  // );

  return (
    <View style={styles.container} bounces={false}>
      <View>
        <Dropdown
          placeholder="Select Module"
          style={styles.Dropdown1}
          items={ModuleArray}
          selectedIndex={SelectedModule}
          onSelect={(index, value) => handleSensorChange(index, value)}
        />
        <View style={styles.titleView}>
          <Dropdown
            placeholder="Chart Type"
            style={styles.Dropdown2}
            items={TypeArray}
            selectedIndex={SelectedType}
            onSelect={(index, value) => handleTypeChange(index, value)}
          />
          <Dropdown
            placeholder="Chart Range"
            style={styles.Dropdown2}
            items={RangeArray}
            selectedIndex={SelectedRange}
            onSelect={(index, value) => handleRangeChange(index, value)}
          />
        </View>
      </View>
      {chartsLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <ScrollView horizontal style={styles.background}>
          {SelectedTypeValue === 'PM 1 CHART' ||
          SelectedTypeValue === 'PM 10 CHART' ||
          SelectedTypeValue === 'PM 2.5 CHART' ? (
            <ScrollView horizontal style={styles.chartView}>
              <VictoryChart
                width={width}
                height={hp('55%')}
                theme={VictoryTheme.material}
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
                      stroke: '#2196f3',
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
};

export default ChartsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Dropdown1: {
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
  Dropdown2: {
    width: wp('43%'),
    height: hp('4%'),
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
  },
  titleView: {
    alignItems: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  background: {
    backgroundColor: '#f1f1f8',
    flex: 1,
    paddingHorizontal: hp('0%'),
  },
  chartView: {
    // marginTop: hp('0%'),
    // borderRadius: wp('2%'),
    backgroundColor: colors.white,
    // alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('8%'),
  },
  AxisLabel: { fontSize: hp('5%'), padding: wp('10%') },
  TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') },

  TextView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('30%'),
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
});
