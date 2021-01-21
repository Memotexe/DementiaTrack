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
          { date: "1/11/19", time: "1:30 AM" },
          { date: "1/12/19", time: "5:30 PM" },
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
