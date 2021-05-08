import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReUserState } from "./actions/userActions";
import jwt_decode from "jwt-decode";

class LoginRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
    // console.log('login',props)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Login = (e) => {
    e.preventDefault();
    // this.props.setShowComponent(false);
    this.setState({ [e.target.name]: e.target.value });
    const Data = {
      password: this.state.password,
      email: this.state.email,
    };

    axios
      .post(`https://comp0067.herokuapp.com/login`, { Data })
      .then((res) => {
        console.log(res);
        if (res["data"].message) {
          // fail
          const err = res.data.message;
          this.setState({
            errors: err,
          });
          alert("The email and/or password you entered were incorrect");
          // return;
          this.props.history.push(``);
        } else {
          // successful

          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          var token = res.data.token;
          var decoded_token = jwt_decode(token);
          console.log(decoded_token);
          this.props.ReUserState(true);
          var userId = decoded_token.userId;

          axios
            .post("https://comp0067.herokuapp.com/whichbusiness", { userId })
            .then((res) => {
              console.log(res);
              var business_name = res.data.businessName;
              this.props.setShowComponent(false);
              console.log(business_name);
              this.props.history.push(`/-/${business_name}/true`);
            });

          //   this.props.history.push("/about");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.erros ? (
          <i className="alert alert-danger" role="alert">
            {this.state.erros}
          </i>
        ) : (
          ""
        )}
        <hr></hr>
        <form className="form-signin">
          <h4 className="h3 mb-3 font-weight-normal grey">Please sign in</h4>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
          />
          <input
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
          />
          <button
            onClick={this.Login}
            className="btn btn-md btn-primary btn-block"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </React.Fragment>
    );
  }
}

LoginRedux.propTypes = {
  ReUserState: PropTypes.func.isRequired,
  Users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Users: state.Users,
});

export default connect(mapStateToProps, { ReUserState })(LoginRedux);
