import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**This is where the site for the Contributions is:
 * Here we will show credit to who did what part in this project.
 * Or in other words a quick Git Blame instance.
 **/

export class Contributions extends Component {
  render() {
    return (
      <div>
        <h2>Contributions:</h2>
        <body>
          <p>
            Here lies the credit due to all who worked on this project. The time
            spent in agonizing pain, or joyful relief!<br></br>
            Thank you to all who contributed to this project as well as led us
            on the right track to get this done.<br></br>
            Team Lead,<br></br>
            Chase Walters
          </p>

          <p>
            <h5>Project Advisor:</h5>
            <h6>Dr. Beomjin Kim</h6>
            <br></br>
            <h5>Project Manager:</h5>
            <h6>Isaiah Fisher</h6>
            <br></br>
            <h5>Team Lead & Symptom-Wandering/Pacing:</h5>
            <h6>Chase Walters</h6>
            <br></br>
            <h5>Database Developer & Symptom-Sleep Disorder:</h5>
            <h6>Tyler McCaulley</h6>
            <br></br>
            <h5>Lead Tester & Symptom-UTI:</h5>
            <h6>Brendan Perry</h6>
            <br></br>
            <h5>Co-Lead Tester & Symptom-Daily Activities:</h5>
            <h6>Ryan Hurd</h6>
            <br></br>

            <h5>Frontend Contributions</h5>
            <p>
              As for our work on the Frontend, the Team and I all contributed to
              each of the pages associated on the system and I, Chase, took the
              time to handle the framework and all the extra pages coalligned
              with our project.
            </p>

            <br></br>
            <h5>Project Sponsor</h5>
            <h6>Parkview Mirro Center</h6>
          </p>
        </body>
      </div>
    );
  }
}

export default Contributions;
