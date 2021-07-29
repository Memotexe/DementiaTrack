import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";
import DBContents from "./DBContents";

/**This is the rendered screen for the
 * dashboard. So when the user is on the main
 * page of the application and not in any certian page
 * that is a symptom, it'll show this page.
 **/

export default function Dashboard() {
  return (
    <div>
      <Fragment>
        <DBContents />
      </Fragment>
    </div>
  );
}
