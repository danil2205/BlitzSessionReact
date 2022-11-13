import React, { Component } from 'react';
import  { Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchAccounts } from "../redux/ActionCreators";
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
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchAccounts: () => {dispatch(fetchAccounts())},
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route exact path="/accounts" element={<Accounts accounts={this.props.accounts.accounts}
                                                           isLoading={this.props.accounts.isLoading}
                                                           errMess={this.props.accounts.errMess} />}
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
