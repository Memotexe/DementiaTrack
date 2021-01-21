import React from "react";
import ImageCarousel from "../src/components/helpers/ImageCarousel";
import { tempPic } from "./images/temp.png";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Given the Image Carousel", () => {
  let element;

  beforeEach(() => {
    element = render(
      <ImageCarousel images={[<img src={tempPic} alt={"graph"} />]} />
    );
  });

  describe("When displayed", () => {
    it("Then the correct image is shown", () => {
      const image = element.container.querySelector("img");

      expect(image.src).toContain("tempPic");
    });

    it("Then the fullscreen carousel is not displayed", () => {
      const fullscreenContainer = element.container.querySelector(
        "#fullscreenContainer"
      );

      expect(fullscreenContainer).not.toBeVisible();
    });
  });

  describe("When view fullscreen button is clicked", () => {
    it("Then the fullscreen carousel is displayed", () => {
      const fullscreenContainer = element.container.querySelector(
        "#fullscreenContainer"
      );
      const viewFullscreenButton = element.getByText("View Fullscreen");

      fireEvent.click(viewFullscreenButton);

      expect(fullscreenContainer).toBeVisible();
    });
  });

  describe("When the close fullscreen button is clicked", () => {
    it("Then the fullscreen carousel is closed", () => {
      const fullscreenContainer = element.container.querySelector(
        "#fullscreenContainer"
      );
      const viewFullscreenButton = element.getByText("View Fullscreen");
      const closeButton = element.getByText("Close");

      fireEvent.click(viewFullscreenButton);

      expect(fullscreenContainer).toBeVisible();

      fireEvent.click(closeButton);

      expect(fullscreenContainer).not.toBeVisible();
    });
  });
});
