import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

/**This function is the Registration part of the
 * Web application. With this there are
 * a set of variables like the
 * state, propTypes, an action called onSubmit
 * and onChange. Finally there is the render function.
 *
 * Starting with the state: There is the username and
 * password and password2 and email which is neccessary for a user
 * who has registered their account can log into the application.
 *
 * As for propTypes: We have the register feature from the proptype
 * and the IsAuthenticated is used to make sure the user has
 * a proper token
 *
 * The onSubmit action uses the preventDefault premade function to
 * make sure the information in the fields isnt blank
 * then uses the credentials used to and begins to check on whether
 * the password and password2 are matching because passwords need
 * to match to make an account, with that the email is checked with the
 * auth library of django/rest/redux will ensure that the text in the
 * email field is truly an email
 *
 * The onChange is a constantly updated action because in the case
 * that the user changes what is in the fields for username and password
 * it will update the second a change is made.
 *
 * Finally is the Render function, that is what is returned to the
 * web application to allow the system display the form and headers
 * to make the site visually representable.
 *
 *
 * At the bottom is the MapStateToProps this is to control on whether
 * they move on to the next page based on the account created and
 * the token checks out.
 **/

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      console.log("Future Error Handling");
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-5 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
