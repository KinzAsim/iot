/* eslint-disable consistent-return */
/* eslint-disable default-case */
const initState = {
  sensors: [],
  sensorLoading: false,
  logs: [],
  logsLoading: false,
  charts: [],
  chartsLoading: false,
  highest: 1,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false,
};

const envReducer = (state = initState, action) => {
  let index;
  switch (action.type) {
    case 'SENSOR_LOADING':
      return {
        ...state,
        sensorLoading: true,
      };
    case 'GET_SENSOR':
      return {
        ...state,
        sensors: action.payload,
        sensorLoading: false,
      };
    case 'LOGS_LOADING':
      return {
        ...state,
        logsLoading: true,
      };
    case 'GET_LOGS':
      return {
        ...state,
        logs: action.payload,
        logsLoading: false,
      };

    case 'CHART_LOADING':
      return {
        ...state,
        chartsLoading: true,
      };
    case 'GET_CHART':
      return {
        ...state,
        charts: action.payload,
        chartsLoading: false,
        highest: action.highest,
      };
    case 'ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true,
      };
    case 'GET_ALERTS':
      return {
        ...state,
        alertColumns: action.payload.columns,
        alertData: action.payload.data,
        alertTitle: action.payload.title,
        alertLoading: false,
      };
    case 'SET_PM2_5_L_THRESHOLD':
    case 'UPDATE_PM2_5_L_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm2_5threshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_PM2_5_U_THRESHOLD':
    case 'UPDATE_PM2_5_U_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm2_5upperThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_PM1_U_THRESHOLD':
    case 'UPDATE_PM1_U_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm1_upperThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_PM10_U_THRESHOLD':
    case 'UPDATE_PM10_U_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm10_upperThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };

    case 'UPDATE_PM1':
      index = state.sensors.findIndex(f => f._id === action.payload.env_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm1: action.payload.pm1,
          },
          ...state.sensors.slice(index + 1),
        ],
      };

    case 'UPDATE_PM2_5':
      index = state.sensors.findIndex(f => f._id === action.payload.env_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm2_5: action.payload.pm2_5,
          },
          ...state.sensors.slice(index + 1),
        ],
      };

    case 'UPDATE_PM10':
      index = state.sensors.findIndex(f => f._id === action.payload.env_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            pm10: action.payload.pm10,
          },
          ...state.sensors.slice(index + 1),
        ],
      };

    default:
      return state;
  }
};

export default envReducer;
