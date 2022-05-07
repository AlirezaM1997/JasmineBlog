import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../style/slider.css";
import { useEffect } from "react";
import { useAllState } from "../Provider";

export default function MySlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 10,
  };

  const { setSlideNumber } = useAllState();

  return (
    <>
      <Slider {...settings} afterChange={(e) => setSlideNumber(e + 1)}>
        <div className="slide-content">
          <article className="post post-horizontal-large relative w-full after:table after:clear-both after:content-none">
            <div className="post__thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img id="test" src={require("../images/slide1.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link
                to={"#"}
                className="post__cat inline-block mb-4 mr-2 md:py-1 md:px-4 px-3 text-white font-normal text-xs uppercase"
              >
                blog
              </Link>
              <h3 className="post__title md:mb-5 mb-3 font-bold text-2xl">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
              <div className="post__excerpt mb-9 mt-0 text-base text-[#888]">
                <div className="excerpt overflow-hidden">
                  <p className="mb-4">
                    Met to launch on the manufacturer’s new A330neo aircraft in
                    2017, it’s offering lots of extra space, including wider
                    seats as
                  </p>
                </div>
              </div>
              <div className="post__readmore mb-0 md:block hidden">
                <Link
                  className="button__readmore relative text-[#888] text-sm"
                  to={"#"}
                >
                  <span>READ MORE</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
        <div className="slide-content">
          <article className="post post-horizontal-large relative w-full after:table after:clear-both after:content-none">
            <div className="post__thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img src={require("../images/slide2.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link
                to={"#"}
                className="post__cat inline-block mb-4 mr-2 md:py-1 md:px-4 px-3 text-white font-normal text-xs uppercase"
              >
                blog
              </Link>
              <h3 className="post__title md:mb-5 mb-3 font-bold text-2xl">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
              <div className="post__excerpt mb-9 mt-0 text-base text-[#888]">
                <div className="excerpt overflow-hidden">
                  <p className="mb-4">
                    Met to launch on the manufacturer’s new A330neo aircraft in
                    2017, it’s offering lots of extra space, including wider
                    seats as
                  </p>
                </div>
              </div>
              <div className="post__readmore mb-0 md:block hidden">
                <Link
                  className="button__readmore relative text-[#888] text-sm"
                  to={"#"}
                >
                  <span>READ MORE</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
        <div className="slide-content">
          <article className="post post-horizontal-large relative w-full after:table after:clear-both after:content-none">
            <div className="post__thumb relative">
              <Link to={"#"} className="w-full h-full block">
                <img src={require("../images/slide3.jpg")}></img>
              </Link>
            </div>
            <div className="post__text pt-5 overflow-hidden">
              <Link
                to={"#"}
                className="post__cat inline-block mb-4 mr-2 md:py-1 md:px-4 px-3 text-white font-normal text-xs uppercase"
              >
                blog
              </Link>
              <h3 className="post__title md:mb-5 mb-3 font-bold text-2xl">
                <Link to={"#"}>It Is Not White Hair That Engenders Wisdom</Link>
              </h3>
              <div className="post__excerpt mb-9 mt-0 text-base text-[#888]">
                <div className="excerpt overflow-hidden">
                  <p className="mb-4">
                    Met to launch on the manufacturer’s new A330neo aircraft in
                    2017, it’s offering lots of extra space, including wider
                    seats as
                  </p>
                </div>
              </div>
              <div className="post__readmore mb-0 md:block hidden">
                <Link
                  className="button__readmore relative text-[#888] text-sm"
                  to={"#"}
                >
                  <span>READ MORE</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Slider>
    </>
  );
}
