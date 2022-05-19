import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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
  const { topBlogs } = useAllState();

  return (
    <>
      <Slider {...settings} afterChange={(e) => setSlideNumber(e + 1)}>
        {topBlogs.map((item , i) => (
          <div key={i} className="slide-content">
            <article className="post post-horizontal-large relative w-full after:table after:clear-both after:content-none">
              <div className="post__thumb relative">
                <Link to={`/blog/${item._id}`} className="w-full h-full block">
                  <img id="test" src={item.imgurl}></img>
                </Link>
              </div>
              <div className="post__text pt-5 overflow-hidden">
                <div>
                  <Link
                    to={`/category/${item.cat}`}
                    className="post__cat bg-[#607027] inline-block mb-4 mr-2 py-2 md:px-4 px-3 text-white font-normal text-xs uppercase"
                  >
                    {item.cat}
                  </Link>
                  <div className="inline-block mb-4 mr-2 py-2 md:px-3 px-2 font-bold text-xs">
                    <i className="fa fa-star text-yellow-400 mr-1" aria-hidden="true"></i>
                    <span className="font-[system-ui]">High Score</span>
                  </div>
                </div>
                <h3 className="post__title md:mb-5 mb-3 font-bold text-2xl">
                  <Link to={`/blog/${item._id}`}>{item.title}</Link>
                </h3>
                <div className="post__excerpt mb-9 mt-0 text-base text-[#888]">
                  <div className="excerpt overflow-hidden">
                    <p
                      className="blogText_slider overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    ></p>
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
        ))}
      </Slider>
    </>
  );
}
