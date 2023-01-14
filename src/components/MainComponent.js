import React, { Component } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  checkJWTToken,
  fetchAccounts,
  postAccount,
  loginUser,
  signupUser,
  deleteAccount,
  postFeedback,
  postSettings,
  fetchSettings,
  logoutUser,
  postSessionData,
  fetchSessionData,
} from '../redux/ActionCreators.js';
import Accounts from './AccountComponent.js';
import Contact from './ContactComponent.js';
import Navbar from './NavBar.js';
import Session from './SessionComponent.js';
import SearchPlayer from './SearchUserComponent.js';
import Widget from './WidgetComponent.js';
import { actions } from 'react-redux-form';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    jwttoken: state.jwttoken,
    widget: state.widget,
    settings: state.settings,
    auth: state.auth,
    session: state.session,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => {dispatch(fetchAccounts())},
  loginUser: (credentials) => {dispatch(loginUser(credentials))},
  logoutUser: () => {dispatch(logoutUser())},
  signupUser: (credentials) => {dispatch(signupUser(credentials))},
  checkJWTToken: () => {dispatch(checkJWTToken())},
  postAccount: () => {dispatch(postAccount())},
  deleteAccount: (account_id) => {dispatch(deleteAccount(account_id))},
  resetForm: (name) => {dispatch(actions.reset(name))},
  postFeedback: (feedback) => {dispatch(postFeedback(feedback))},
  postSettings: (settings) => {dispatch(postSettings(settings))},
  fetchSettings: () => {dispatch(fetchSettings())},
  postSessionData: (data) => {dispatch(postSessionData(data))},
  fetchSessionData: () => {dispatch(fetchSessionData())},
});

class Main extends Component {

  componentDidMount() {
    this.props.checkJWTToken();
    this.props.fetchAccounts();
    this.props.fetchSettings();
    this.props.fetchSessionData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { auth } = this.props;
    if (auth.user !== prevProps.auth.user) {
      this.setState({
        auth: auth,
      });
      this.props.checkJWTToken();
      this.props.fetchAccounts();
      this.props.fetchSettings();
    }
  }

  render() {
    return (
      <div className='main-div'>
        <Navbar loginUser={this.props.loginUser}
                signupUser={this.props.signupUser}
                logoutUser={this.props.logoutUser}
                auth={this.props.auth}
                tokenInfo={this.props.jwttoken}
                postAccount={this.props.postAccount}
                resetForm={this.props.resetForm}
        />
        <Routes>
          <Route path='*' element={<Navigate to='/accounts' />} />
          <Route exact path='/accounts' element={<Accounts accounts={this.props.accounts.accounts}
                                                           isLoading={this.props.accounts.isLoading}
                                                           errMess={this.props.accounts.errMess}
                                                           deleteAccount={this.props.deleteAccount}
          />}
          />
          <Route exact path='/session' element={<Session accounts={this.props.accounts.accounts}
                                                         settings={this.props.settings.settings}
                                                         isLoading={this.props.settings.isLoading}
                                                         errMess={this.props.settings.errMess}
                                                         session={this.props.session.session}
                                                         postSessionData={this.props.postSessionData}
          />}
          />
          <Route exact path='/session/configure-widget' element={<Widget widget={this.props.widget}
                                                                         postSettings={this.props.postSettings}
          />}
          />
          <Route exact path='/user-search' element={<SearchPlayer />}/>
          <Route exact path='/contactus' element={<Contact resetForm={this.props.resetForm}
                                                           postFeedback={this.props.postFeedback}
          />}
          />
        </Routes>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
