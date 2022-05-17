import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAllState } from "../Provider";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Category() {
  const { parsIsoDate } = useAllState();
  const { cat } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogsByCat, setBlogsByCat] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/blog")
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        }
      })
      .then((res) => {
        setBlogsByCat(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <div className="py-20">
        <div className="container mx-auto">
          <div className="jasmine-heading relative text-center mb-10">
            <h4 className="heading__title inline-block relative m-0 text-4xl leading-6 pr-12 pl-16 z-10">
              {cat} Blogs
            </h4>
          </div>
        </div>
        <div className="container makbook:px-11">
          <div className="blogList__inner px-2">
            <div className="new-posts-list -m-4 flex flex-wrap">
              {blogsByCat
                .filter((item) => item.cat === cat)
                .sort((a, b) => {
                  return b.averageScore - a.averageScore;
                })
                .map((i, index) => (
                  <div
                    key={index}
                    className="allBlogs-post w-full border-b border-[#0000000d] py-10"
                  >
                    <article className="w-full flex iphone:flex-col relative">
                      <div className="post-image tablet:h-[300px] iphone:w-full w-1/2 laptop:mt-0 LED:mr-[30px] LED:mb-[50px] LED:ml-[50px]  tablap:h-[365px] md:float-left  LCD:mt-0 LCD:mr-[75px] LCD:mb-[70px] LCD:ml-[70px]  LCD:h-[385px] relative before:iphone:left-0 before:iphone:bottom-0  before:LCD:-left-[70px] before:LCD:-bottom-[70px] before:LED:-left-[50px] before:LED:-bottom-[50px] before:content-[''] before:absolute before:w-full before:h-full before:bg-[#607027] before:-z-[1]">
                        <Link
                          to={`/blog/${i._id}`}
                          className="w-full h-full black"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={i.imgurl}
                          ></img>
                        </Link>
                        <div className="post__tags laptop:w-[calc(100%-50px)] laptop:h-[50px] flex items-center overflow-hidden text-left text-[#ffffffb3] w-[calc(100%-70px)] h-[70px]">
                          <ul className="tag-list inline-block -m-1 p-0 align-middle">
                            <li className="m-1 inline-block py-0 leading-4">
                              <Link
                                to={"#"}
                                className="post-tag w-full h-full text-xs before:content-['#'] hover:text-white"
                              >
                                Fashion
                              </Link>
                            </li>
                            <li className="m-1 inline-block py-0 leading-4">
                              <Link
                                to={"#"}
                                className="post-tag w-full h-full text-xs before:content-['#'] hover:text-white"
                              >
                                Health
                              </Link>
                            </li>
                            <li className="m-1 inline-block py-0 leading-4">
                              <Link
                                to={"#"}
                                className="post-tag w-full h-full text-xs before:content-['#'] hover:text-white"
                              >
                                Lifestyle
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="post-text md:w-1/2 pt-[35px] md:text-center overflow-hidden">
                        <Link
                          to={`/category/${i.cat}`}
                          className="mb-[15px] mr-2 font-normal text-[11px] uppercase inline-block py-[7px] px-[14px] md:py-2 md:px-[18px] bg-[#607027] text-white"
                        >
                          {i.cat}
                        </Link>
                        <h3 className="iphone:text-[1.5rem] iphone:leading-[1.4] iphone:mb-[15px] mb-[20px] fablet:text-[1.7rem] fablet:leading-[1.3] makbook:text-[1.8rem] font-bold mx-auto whitespace-normal break-words">
                          <Link
                            to={`/blog/${i._id}`}
                            // style={{ display: "-webkit-box" }}
                            className="overflow-hidden"
                          >
                            {i.title}
                          </Link>
                        </h3>
                        <div className="post__excerpt iphone:mb-0 md:mb-[20px] md:mx-auto text-[#888] text-[1.07rem] leading-6">
                          <div className="excerpt">
                            <p
                              className="blogText_homePage overflow-hidden text-ellipsis"
                              dangerouslySetInnerHTML={{
                                __html: i.content,
                              }}
                            ></p>
                          </div>
                        </div>
                        <ul className="social-list iphone:hidden mb-0 opacity-80 text-base">
                          <li className="py-0 inline-block">
                            <Link
                              to={"#"}
                              className="px-[0.4em] inline-block hover:text-gray-600 text-[#000000cc] leading-5 w-[22px] h-[22px] bg-opacity-0 mx-[5px] relative rounded-full"
                            >
                              <div className="share-item__icon">
                                <FontAwesomeIcon
                                  title="twitter"
                                  icon={faTwitter}
                                ></FontAwesomeIcon>
                              </div>
                            </Link>
                          </li>
                          <li className="py-0 inline-block">
                            <Link
                              to={"#"}
                              className="px-[0.4em] inline-block hover:text-gray-600 text-[#000000cc] leading-5 w-[22px] h-[22px] bg-opacity-0 mx-[5px] relative rounded-full"
                            >
                              <div className="share-item__icon">
                                <FontAwesomeIcon
                                  title="facebook"
                                  icon={faFacebookF}
                                ></FontAwesomeIcon>
                              </div>
                            </Link>
                          </li>
                          <li className="py-0 inline-block">
                            <Link
                              to={"#"}
                              className="px-[0.4em] inline-block hover:text-gray-600 text-[#000000cc] leading-5 w-[22px] h-[22px] bg-opacity-0 mx-[5px] relative rounded-full"
                            >
                              <div className="share-item__icon">
                                <FontAwesomeIcon
                                  title="linkedin"
                                  icon={faLinkedinIn}
                                ></FontAwesomeIcon>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
