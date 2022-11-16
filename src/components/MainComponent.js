import React, { Component } from 'react';
import  { Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux'
import { checkJWTToken, fetchAccounts, postAccount, loginUser, signupUser } from "../redux/ActionCreators";
import Accounts from "./AccountComponent";
import Contact from "./ContactComponent";
import Home from "./HomeComponent";
import Navbar from "./NavBar";
import Session from "./SessionComponent";
import SearchUser from "./SearchUserComponent";

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
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => {dispatch(fetchAccounts())},
  loginUser: (username, password) => {dispatch(loginUser(username, password))},
  signupUser: (username, password) => {dispatch(signupUser(username, password))},
  checkJWTToken: () => {dispatch(checkJWTToken())},
  postAccount: () => {dispatch(postAccount())},
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchAccounts();
    this.props.checkJWTToken();
  }

  render() {
    return (
      <div>
        <Navbar loginUser={this.props.loginUser}
                signupUser={this.props.signupUser}
                tokenInfo={this.props.jwttoken}
                postAccount={this.props.postAccount}
        />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route exact path="/accounts" element={<Accounts accounts={this.props.accounts.accounts}
                                                           isLoading={this.props.accounts.isLoading}
                                                           errMess={this.props.accounts.errMess}
          />}
          />
          <Route exact path="/session" element={<Session />}/>
          <Route exact path="/user-search" element={<SearchUser />}/>
          <Route exact path="/contactus" element={<Contact />}/>
        </Routes>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
