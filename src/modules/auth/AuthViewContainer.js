// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AuthView from './AuthView';

import {register, login} from '../../redux/actions/authActions';
import {clearErrors} from '../../redux/actions/errorActions';

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    isLoading : state.auth.isLoading,
    error : state.error
  });

export default compose(connect(mapStateToProps, {register, login, clearErrors}))(AuthView);
