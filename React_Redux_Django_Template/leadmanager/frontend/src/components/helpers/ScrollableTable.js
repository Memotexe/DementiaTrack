import React, { Component } from "react";
import "../../../stylesheets/ScrollableTable.css";

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
              <th key={heading} style={{ width: "350px" }}>
                <div className="tableHeader">{heading}</div>
              </th>
            ))}
          </tr>

          {this.props.data.map((row, i) => (
            <tr
              key={row.date + row.time}
              style={{
                backgroundColor:
                  i % 2 == 0
                    ? primaryBackgroundColor
                    : alternateBackgroundColor,
              }}
            >
              <td>{row.date}</td>
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ScrollableTable;
