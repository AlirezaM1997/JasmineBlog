import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import MagicSliderDots from "react-magic-slider-dots";
// import "react-magic-slider-dots/dist/magic-dots.css";

export default function MySlider() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // appendDots: (dots) => {
    //   return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    // },
  };
  return (
    <>
      <Slider {...settings}>
        <div className="slide-content item">
          <article className="post post-horizontal-large relative w-full">
            <div className="post_thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img src={require("../images/slide1.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link to={"#"} className="mb-4">
                blog
              </Link>
              <h3 className="post__title">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
            </div>
          </article>
        </div>
        <div className="slide-content item">
          <article className="post post-horizontal-large relative w-full">
            <div className="post_thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img src={require("../images/slide2.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link to={"#"} className="mb-4">
                blog
              </Link>
              <h3 className="post__title">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
            </div>
          </article>
        </div>
        <div className="slide-content item">
          <article className="post post-horizontal-large relative w-full">
            <div className="post_thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img src={require("../images/slide3.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link to={"#"} className="mb-4">
                blog
              </Link>
              <h3 className="post__title">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
            </div>
          </article>
        </div>
      </Slider>
    </>
  );
}
