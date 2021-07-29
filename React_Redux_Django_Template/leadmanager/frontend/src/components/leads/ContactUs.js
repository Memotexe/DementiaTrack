import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**This is where the site for the ContactUs screen
 * of the project. So with this, you can
 * utilize the javascript libraries to produce
 * a page for user to contact a support line.
 **/

export class ContactUs extends Component {
  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Contact Us:</h2>
        <form
          action="mailto:cmwalters61@gmail.com?subject=Problem/Concern Submission"
          method="post"
          encType="text/plain"
        >
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" name="Name of User " />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="Email of User "
            />
          </div>
          <div className="form-group">
            <label>Problem/Question</label>
            <input
              className="form-control"
              type="text"
              name="Problem or Concern "
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-priary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
