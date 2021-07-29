import React, { Component } from "react";
import Carousel, {
  arrowsPlugin,
  Dots,
  infinitePlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../../stylesheets/ImageCarousel.css";

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      slides: props.images,
    };

    this.onChange = this.onChange.bind(this);
    this.fullscreenElement = React.createRef();
    this.openFullscreen = this.openFullscreen.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  openFullscreen() {
    this.fullscreenElement.current.open();
  }

  render() {
    return (
        <div id="carouselContainer">
          <Carousel
            plugins={[
              {
                resolve: arrowsPlugin,
                options: {
                  arrowLeft: (
                    <button className="arrowButton">
                      <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </button>
                  ),
                  arrowRight: (
                    <button className="arrowButton">
                      <FontAwesomeIcon icon={faArrowCircleRight} />
                    </button>
                  ),
                  addArrowClickHandler: true,
                },
              },
              {
                resolve: infinitePlugin,
              },
            ]}
            value={this.state.value}
            slides={this.props.images}
            onChange={this.onChange}
          />
        <div id="centerDots">
          <Dots
            value={this.state.value}
            onChange={this.onChange}
            number={this.state.slides.length}
          />
          <button onClick={this.openFullscreen} className="button">
            View Fullscreen
          </button>
        </div>
        <FullscreenImageCarousel
          ref={this.fullscreenElement}
          images={this.props.images}
        />
      </div>
    );
  }
}

class FullscreenImageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      slides: props.images,
      visibility: "hidden",
    };

    this.onChange = this.onChange.bind(this);
    this.close = this.close.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  open() {
    this.setState({
      visibility: "visible",
    });
  }

  close() {
    this.setState({
      visibility: "hidden",
    });
  }

  render() {
    return (
      <div
        id="fullscreenContainer"
        style={{ visibility: this.state.visibility }}
      >
        <button onClick={this.close} id="closeFullscreenButton">
          Close
        </button>
        <Carousel
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: (
                  <button className="arrowButton">
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </button>
                ),
                arrowRight: (
                  <button className="arrowButton">
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                  </button>
                ),
                addArrowClickHandler: true,
              },
            },
            {
              resolve: infinitePlugin,
            },
          ]}
          value={this.state.value}
          slides={this.state.slides}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default ImageCarousel;
