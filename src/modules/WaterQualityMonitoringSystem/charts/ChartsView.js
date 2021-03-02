import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
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
import { colors, fonts } from '../../../styles';
import { Dropdown } from '../../../components';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      ChartType: [
        'Average Ph Chart', 
        'Average TDS Chart'
      ],
      ChartRange: ['Past Week', 'Past Month', 'Year Chart'],
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue: null,
      selectedType: -1,
      selectedTypeValue: null,
      selectedRange: 0,
      selectedRangeValue: 'Past Week'
    }
  }

  async componentDidMount () {
    const {user} = this.props;
    let done = null;
    done = await this.props.getLmsSensors(user.id,'qa');

    if (done === 'done'){
      this.handleModuleData();  
    }

  }

  handleModuleData = () => {
    const {lms} = this.props;

    const temp = [];

    lms.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      moduleArray : temp,
      selectedModule: 0
    })
  }

  handleModuleChange = (index,value) => {
    const {selectedTypeValue,selectedRangeValue}= this.state;
    const {lms} = this.props;
    const Index2 = lms.findIndex(s=> s.name === value);
    this.setState({
      selectedModule: Index2,
      selectedModuleValue: value
    });

    this.getChartData(selectedTypeValue,selectedRangeValue,Index2);
  }

  handleTypeChange= (index,value) => {
    const {selectedModule} = this.state;
    this.setState({
      selectedType: index,
      selectedTypeValue: value
    });

    this.getChartData(value,this.state.selectedRangeValue,selectedModule);
  }
  
  handleRangeChange= (index,value) => {  
    const {selectedModule} = this.state;  
    this.setState({
      selectedRange: index,
      selectedRangeValue: value
    });

    this.getChartData(this.state.selectedTypeValue,value,selectedModule);
  }


  getChartData = (type,range,module) => {

    const { lms } = this.props;
    const { selectedModule } = this.state;
    
    let range2 = 'week';
    let type2 = 'ph';

    switch(type){
      case 'Average Ph Chart' :
        type2 = 'ph';
        break;
      case 'Average TDS Chart':
        type2 = 'tds';
        break;
      case 'Temperature Chart' :
        type2 = 'temperature';
        break;
      case 'Aerator Status Chart':
        type2 = 'aerator';
        break;
      case 'Motor Status Chart':
        type2 = 'mortor';
        break;
      case 'Dissolved Oxygen Chart':
        type2 = 'do';
        break;
    }

    switch(range){
      case 'Past Week' :
        range2 = 'week';
        break;
      case 'Past Month':
        range2 = 'month';
        break;
      case 'Year Chart' :
        range2 = 'year';
        break;
    }
    this.props.getLmsChartData(type2,range2,lms[module]._id);
  }

render(){
  const {ChartType, ChartRange,selectedTypeValue,selectedRangeValue,moduleArray} = this.state;
  const {charts, chartLoading,highest,lms} = this.props;
  let width = null;
  switch(selectedRangeValue){
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
    <View style={styles.container} bounces={false}>
      <View>
        <Dropdown
                placeholder = 'Select Module'
                style={styles.Dropdown1}         
                items={moduleArray}
                selectedIndex={this.state.selectedModule}
                onSelect={(index,value) => this.handleModuleChange(index,value)}
              />
        <View style={styles.titleView}>        
          <Dropdown
                placeholder = 'Chart Type'
                style={styles.Dropdown2}         
                items={ChartType}
                selectedIndex={this.state.selectedType}
                onSelect={(index,value) => this.handleTypeChange(index,value)}
              />
        <Dropdown
                placeholder = 'Chart Range'
                style={styles.Dropdown2}         
                items={ChartRange}
                selectedIndex={this.state.selectedRange}
                onSelect={(index,value) => this.handleRangeChange(index,value)}
              />
        </View>
        
      </View>
      {chartLoading ? (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View>
      ): (
        <ScrollView horizontal={true} style={styles.background}>

        {selectedTypeValue === 'Average Ph Chart' || selectedTypeValue === 'Average TDS Chart' || 
        selectedTypeValue === 'Average Temperature Chart' || selectedTypeValue === 'Dissolved Oxygen Chart' ? (
          <ScrollView horizontal={true} style={[styles.chartView, { marginBottom: 20 }]}>
          <VictoryChart width={width} height={hp('55%')} theme={VictoryTheme.material} domainPadding={{x: 10, y: 70}} padding={50} domain={{y: [0, highest]}}>
          <VictoryAxis
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: styles.TickLabels
                }}
            />
            <VictoryAxis            
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                //grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                ticks: {stroke: "grey", size: 2},
                tickLabels: styles.TickLabels
              }}
            />
            <VictoryLine
              data={charts}
              interpolation="natural"
              style={{ data: { stroke: "#2196f3", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
          </VictoryChart>
        </ScrollView>
        ) : selectedTypeValue === 'Aerator Status Chart' || selectedTypeValue === 'Motor Status Chart' ? (
          <ScrollView horizontal={true} style={[styles.chartView, { marginBottom: 20}]}>
          <VictoryChart width={width} height={hp('55%')} theme={VictoryTheme.material} domainPadding={{x: 10, y: 55}} padding={50} domain={{y: [0, highest]}}>
            <VictoryAxis 
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: styles.TickLabels
                }}
            />
            <VictoryAxis         
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#e6e6e6"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: styles.TickLabels
              }}
            />

            <VictoryBar
              style={{ data: { fill: "#4f44b6", width:wp('3%')}}}
              //barWidth={50}
              animate
              alignment="start"
              data={charts}
            />
          </VictoryChart>
        </ScrollView>

        ): (
          <View style={styles.TextView}>
            <Text style={styles.Text}>Please Select Chart Type</Text>
          </View>
        )}

      </ScrollView>
      )}
    
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Dropdown1:{ width: wp('80%'),height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%')},
  Dropdown2:{ width: wp('43%'), height: hp('4%'),marginTop: hp('1%'), marginLeft: wp('5%') },
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
    //marginTop: hp('0%'),
    //borderRadius: wp('2%'),
    backgroundColor: colors.white,
    //alignItems: 'center'
    paddingHorizontal:wp('2%'),
    paddingVertical: hp('5%')
  },
  AxisLabel:{fontSize: hp('5%'), padding: wp('10%')},
  TickLabels:{fontSize: hp('1.2%'), padding: wp('3%')},

  TextView:{alignItems: 'center', justifyContent: 'center',marginLeft:wp('30%')},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
});
