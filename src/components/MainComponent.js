import React, { Component } from 'react';
import  { Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
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
  postUserStats,
} from "../redux/ActionCreators";
import Accounts from "./AccountComponent";
import Contact from "./ContactComponent";
import Home from "./HomeComponent";
import Navbar from "./NavBar";
import Session from "./SessionComponent";
import SearchPlayer from "./SearchUserComponent";
import Widget from "./WidgetComponent";
import { actions } from "react-redux-form";

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
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => {dispatch(fetchAccounts())},
  loginUser: (credentials) => {dispatch(loginUser(credentials))},
  signupUser: (credentials) => {dispatch(signupUser(credentials))},
  checkJWTToken: () => {dispatch(checkJWTToken())},
  postAccount: () => {dispatch(postAccount())},
  deleteAccount: (account_id) => {dispatch(deleteAccount(account_id))},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  postFeedback: (feedback) => {dispatch(postFeedback(feedback))},
  postSettings: (settings) => {dispatch(postSettings(settings))},
  fetchSettings: () => {dispatch(fetchSettings())},
  postUserStats: () => {dispatch(postUserStats())},
});

class Main extends Component {

  componentDidMount() {
    this.props.checkJWTToken();
    this.props.fetchAccounts();
    this.props.fetchSettings();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { auth } = this.props;
    if (auth.user?.success !== prevProps.auth.user?.success) {
      this.setState({
        auth: auth,
      });
      this.props.fetchAccounts();
      this.props.fetchSettings();
    }
  }

  render() {
    return (
      <div className="main-div">
        <Navbar loginUser={this.props.loginUser}
                signupUser={this.props.signupUser}
                auth={this.props.auth}
                tokenInfo={this.props.jwttoken}
                postAccount={this.props.postAccount}
        />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route exact path="/accounts" element={<Accounts accounts={this.props.accounts.accounts}
                                                           isLoading={this.props.accounts.isLoading}
                                                           errMess={this.props.accounts.errMess}
                                                           deleteAccount={this.props.deleteAccount}
          />}
          />
          <Route exact path="/session" element={<Session accounts={this.props.accounts.accounts}
                                                         settings={this.props.settings.settings}
                                                         isLoading={this.props.settings.isLoading}
                                                         errMess={this.props.settings.errMess}
                                                         postUserStats={this.props.postUserStats}
                                                         widget={this.props.widget}
          />}
          />
          <Route exact path="/session/configure-widget" element={<Widget widget={this.props.widget}
                                                                         postSettings={this.props.postSettings}
          />}
          />
          <Route exact path="/user-search" element={<SearchPlayer />}/>
          <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                           postFeedback={this.props.postFeedback}
          />}
          />
        </Routes>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
