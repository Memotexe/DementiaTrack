import React, { Component } from "react";
import "../../../stylesheets/ScrollableTable.css";
import { v4 as uuidv4 } from "uuid";

class ScrollableTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const primaryBackgroundColor = "white";
    const alternateBackgroundColor = "lightgray";

    return (
      <table id="table">
        <tbody>
          <tr>
            {this.props.headings.map((heading) => (
              <th key={uuidv4()} style={{ width: "350px" }}>
                <div className="tableHeader">{heading}</div>
              </th>
            ))}
          </tr>

          {this.props.data.map((row, i) => (
            <tr
              key={uuidv4()}
              style={{
                backgroundColor:
                  i % 2 == 0
                    ? primaryBackgroundColor
                    : alternateBackgroundColor,
              }}
            >

            {this.props.headings.map((heading) => (
              <td>{row[heading]}</td>
            ))}

            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScrollableTable;
