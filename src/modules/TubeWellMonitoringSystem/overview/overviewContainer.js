import HomeScreen from './overview';
import {connect} from 'react-redux';
import {getSensors,forceMotor} from '../../../redux/actions/tubewellAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.tubewell.sensors,
    sensorsLoading : state.tubewell.sensorsLoading,
    controlLoading : state.tubewell.controlLoading
})

export default connect(mapStateToProps,{getSensors,forceMotor})(HomeScreen);