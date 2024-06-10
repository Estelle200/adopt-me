import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="mt-2 flex h-[400px] items-center justify-around">
        <img
          className="max-h-[400px] max-w-[45%]"
          src={images[active]}
          alt="animal hero"
        />
        <div className="w-1/2">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={
                index === active
                  ? "m-[15px] inline-block w-[100px] cursor-pointer rounded-full border-2 border-[#333] border-opacity-60"
                  : "m-[15px] inline-block h-[100px] w-[100px] cursor-pointer rounded-full border-2 border-[#333]"
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
