import React from "react";
import ScrollableTable from "../src/components/helpers/ScrollableTable";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Given the Scrollable Table", () => {
  let element;

  beforeEach(() => {
    element = render(
      <ScrollableTable
        headings={["Date", "Time"]}
        data={[
          { Date: "1/11/19", Time: "1:30 AM" },
          { Date: "1/12/19", Time: "5:30 PM" },
        ]}
      />
    );
  });

  describe("When displayed", () => {
    it("Then display the correct data", () => {
      const date = element.getByText("1/11/19");
      const time = element.getByText("1:30 AM");

      expect(date).not.toBe(null);
      expect(time).not.toBe(null);
    });

    it("Then display the correct number of rows", () => {
      const cells = element.container.querySelectorAll("td");

      expect(cells.length).toBe(4);
    });
  });
});
