import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogInfo, setBlogInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:4000/blog/single-blog/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((result) => {
        console.log(result);
        setBlogInfo(result);
        console.log(blogInfo);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="blog-content iphone:pb-[80px]  fablet:pb-[100px]  ">
          <div className="">
            <div className="iphone:mb-[60px] fablet:mb-[70px] tablet:mb-[70px] relative">
              <div className="billboard iphone:min-h-[340px] fablet:min-h-[450px] relative overflow-hidden">
                <div
                  className="bg-img absolute overflow-hidden top-0 bottom-0 left-0 right-0 bg-cover"
                  style={{
                    background: `url(${blogInfo.imgurl}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="bg-img absolute overflow-hidden top-0 bottom-0 left-0 right-0 bg-cover bg-center after:content-[''] after:tablet:opacity-40 after:tablap:opacity-0 after:LCD:opacity-0 after:absolute  after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-[#111]"
                  style={{
                    background: `url(${blogInfo.imgurl}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="billboard__inner iphone:min-h-[340px] fablet:min-h-[450px] tablap:min-h-[600px] LCD:min-h-[540px] flex items-end">
                  <header className="pb-0 md:py-[30px] w-full py-5 m-0 ">
                    <div className="container my-0 laptop:px-[40px] px-[150px] ">
                      <div className="header__inner iphone:p-[15px] p-[20px] bg-[#00000080] makbook:bg-[#3a3a3a80] text-white md:py-[30px] md:px-[40px] relative overflow-hidden makbook:backdrop-blur-[22px] makbook:backdrop-brightness-[137%] makbook:backdrop-grayscale-[10%]">
                        <div
                          className="absolute iphone:hidden bg-cover bg-center blur-[20px]"
                          style={{ background: `url(${blogInfo.imgurl})` }}
                        ></div>

                        <div className="header__content relative">
                          <Link
                            className="iphone:mb-[10px] md:mb-[15px] py-[7px] px-[14px] bg-[#607027] text-xs font-normal uppercase text-white mr-2 inline-block"
                            to={"#"}
                          >
                            {blogInfo.cat}
                          </Link>
                          <h1 className="iphone:text-[1.3rem] iphone:leading-[1.375] mb-[10px] md:mb-[15px] md:text-[1.8rem] md:leading-[1.38] mt-0 max-w-[970px] font-bold text-white">
                            {blogInfo.title}
                          </h1>
                          <div className="meta my-0 text-[#ffffff99] flex flex-wrap items-center text-[0.85rem] leading-6">
                            <span className="mr-[15px] text-[#ffffffcc] text[14px] font-normal">
                              By:
                              <Link className="inline-block" to={"#"}>
                                {blogInfo.creator.name}
                              </Link>
                            </span>
                            <time className="whitespace-nowrap flex flex-wrap items-center">
                              <i
                                class="fa fa-calendar-times-o mr-[0.3em] inline-block align-middle"
                                aria-hidden="true"
                              ></i>
                              May 11, 2022
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </div>

              <div className="content-blog mb-0 relative">
                <div className="container max-w-[970px] px-[35px]">
                  <div className="content-blog-col">
                    <article className="content-blog-text mb-[50px] relative w-full">
                      <div className="">
                        <div className="body px-0 my-[2em] mx-auto text-[#000000b3] leading-[1.6] mt-0 text-[1.14rem] md:text-[1.214rem]">
                          <p
                            className="my-[28px] font-[initial]"
                            dangerouslySetInnerHTML={{
                              __html: blogInfo.content,
                            }}
                          ></p>
                        </div>
                        <div className="social-share mb-10">
                          <div className="iphone:flex iphone:flex-wrap iphone:items-center">
                            <ul className="social-list md:text-[1.142rem] text-base m-0 p-0">
                              <li className="twitter-share p-[5px] inline-block">
                                <Link
                                  to={"3"}
                                  className="py-[10px] pr-5 pl-[15px] text-white items-center flex leading-5 bg-[#55acee] iphone:m-auto iphone:h-auto iphone:text-xs iphone:leading-9"
                                >
                                  <div className="pr-[10px] mr-[15px] relative before:content-[''] before:absolute before:h-3/4 before:w-[1px] before:top-1/2 before:bg-white before:-translate-y-[50%] before:right-0">
                                    <FontAwesomeIcon
                                      icon={faTwitter}
                                      className="leading-[1] font-normal inline-block align-middle"
                                    ></FontAwesomeIcon>
                                  </div>
                                  <div className="">Share on Twitter</div>
                                </Link>
                              </li>
                              <li className="facebook-share p-[5px] inline-block">
                                <Link
                                  to={"3"}
                                  className="py-[10px] pr-5 pl-[15px] text-white items-center flex leading-5 bg-[#3b5998] iphone:m-auto iphone:h-auto iphone:text-xs iphone:leading-9"
                                >
                                  <div className="pr-[10px] mr-[15px] relative before:content-[''] before:absolute before:h-3/4 before:w-[1px] before:top-1/2 before:bg-white before:-translate-y-[50%] before:right-0">
                                    <FontAwesomeIcon
                                      icon={faFacebookF}
                                      className="leading-[1] font-normal inline-block align-middle"
                                    ></FontAwesomeIcon>
                                  </div>
                                  <div className="">Share on Facebook</div>
                                </Link>
                              </li>
                              <li className="linkedin-share p-[5px] inline-block">
                                <Link
                                  to={"3"}
                                  className="py-[10px] pr-5 pl-[15px] text-white items-center flex leading-5 bg-[#0073B0] iphone:m-auto iphone:h-auto iphone:text-xs iphone:leading-9"
                                >
                                  <div className="pr-[10px] mr-[15px] relative before:content-[''] before:absolute before:h-3/4 before:w-[1px] before:top-1/2 before:bg-white before:-translate-y-[50%] before:right-0">
                                    <FontAwesomeIcon
                                      icon={faLinkedinIn}
                                      className="leading-[1] font-normal inline-block align-middle"
                                    ></FontAwesomeIcon>
                                  </div>
                                  <div className="">Share on Linkedin</div>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="hashtags mt-10 text-[#8c8c8c] bg-[#f9f9f9] py-[25px] px-5">
                          <div className="m-0 p-0 flex after:clear-both after:content-[''] after:table">
                            <div className="text-[#888] text-xs font-normal tracking-[1px] uppercase flex flex-1 flex-wrap items-center">
                              <ul className="post__tags p-0 inline-block align-middle">
                                <li className="mr-[10px] inline-block leading-[2]">
                                  <Link
                                    to={"#"}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    blog
                                  </Link>
                                </li>
                                <li className="mr-[10px] inline-block leading-[2]">
                                  <Link
                                    to={"#"}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    home
                                  </Link>
                                </li>
                                <li className="mr-[10px] inline-block leading-[2]">
                                  <Link
                                    to={"#"}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    public
                                  </Link>
                                </li>
                                <li className="mr-[10px] inline-block leading-[2]">
                                  <Link
                                    to={"#"}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    lifestyle
                                  </Link>
                                </li>
                                <li className="mr-[10px] inline-block leading-[2]">
                                  <Link
                                    to={"#"}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    people
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                    <div className="author-info-and-navigation iphone:block flex flex-wrap mb-[60px]">
                      <div className="author-box iphone:w-full iphone:mb-10 iphone:ml-0 w-[320px] mb-[45px] ml-[45px] min-h-[100px] relative text-center bg-[#fafafa] py-10 px-5 before:md:w-full before:md:h-full before:md:top-[45px] before:md:absolute before:md:-z-[1] before:md:-left-[45px] before:md:bg-[#607027]">
                        <div className="author-box-img text-center">
                          <div className="author-avatar mx-auto iphone:mt-0 mb-[20px] rounded-full relative top-0 text-center right-auto bottom-auto left-0  overflow-hidden w-[100px] h-[100px]">
                            <img
                              src={blogInfo.creator.avatar}
                              className="w-full h-full"
                            ></img>
                          </div>
                        </div>
                        <div className="author-box-text md:max-w-[768px] pl-0 text-center">
                          <div className="author-name mb-3">
                            <Link
                              to={"#"}
                              className="text-[110%] font-bold text-[#607027]"
                            >
                              Ali
                            </Link>
                          </div>
                          <div className="author-bio mb-3 text-[16px] text-[#00000099] font-normal">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </div>
                          <div className="author-info text-[#00000099]">
                            <ul className="social-list text-[1rem] md:text-[1.142rem] px-0 my-0">
                              <li className="inline-block py-0">
                                <Link
                                  to={"#"}
                                  className="text-base leading-5 inline-block px-[0.4em]"
                                >
                                  <FontAwesomeIcon
                                    icon={faFacebookF}
                                    className="w-[13px] h-[13px] overflow-hidden"
                                  ></FontAwesomeIcon>
                                </Link>
                              </li>
                              <li className="inline-block py-0">
                                <Link
                                  to={"#"}
                                  className="text-base leading-5 inline-block px-[0.4em]"
                                >
                                  <FontAwesomeIcon
                                    icon={faLinkedinIn}
                                    className="w-[13px] h-[13px] overflow-hidden"
                                  ></FontAwesomeIcon>
                                </Link>
                              </li>
                              <li className="inline-block py-0">
                                <Link
                                  to={"#"}
                                  className="text-base leading-5 inline-block px-[0.4em]"
                                >
                                  <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="w-[13px] h-[13px] overflow-hidden"
                                  ></FontAwesomeIcon>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="posts-navigation ml-[30px] iphone:ml-0 p-0 flex-1 mb-0">
                        <div className="posts-navigation__prev w-full min-h-[50%] flex flex-col mb-[30px] relative after:clear-both">
                          <article className="w-[calc(100%+15px)] h-full bg-transparent pl-[15px] -mx-[15px] flex relative overflow-hidden">
                            <div className="post__thumb absolute w-full h-full">
                              <Link to={"#"} className="w-full h-full">
                                <img
                                  src={require("../images/post-overlay2.jpg")}
                                  className="w-full h-full object-cover"
                                ></img>
                              </Link>
                            </div>
                            <div className="post__text flex items-end min-h-[200px] z-[1] pointer-events-none w-full relative text-white">
                              <div className="post__text-wrap w-full pl-[15px]">
                                <div className="post__text-inner tablet:px-5 pt-0 tablet:pb-5 makbook:px-[25px] makbook:pb-[25px] -ml-[15px] relative">
                                  <Link
                                    to={"#"}
                                    className='tablet:py-2 tablet:pr-3 tablet:pl-[35px] tablet:-ml-[35px] bg-[#607027] h-auto w-fit block leading-[1] relative -ml-[40px] pl-10 text-white mb-[15px] after:content-[""] after:absolute after:top-full after:left-0 after:border-[15px] after:border-transparent after:border-solid after:border-r-0 after:text-[55px] after:z[1]'
                                  >
                                    Previous Article
                                  </Link>
                                  <h3 className="mb-0 whitespace-normal break-words font-medium text-white pointer-events-auto text-[1.15rem] leading-[1.4]">
                                    <Link
                                      to={"#"}
                                      className="text-white inline-block"
                                    >
                                      Shoot for the Moon and if You Miss You
                                      Will Still Be Among the Stars
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <Link
                              to={"#"}
                              className="link-overlay absolute top-0 right-0 bottom-0 left-0 block after:bg-[#333] after:content-[''] after:w-[calc(100% - 15px)] after:-z-[1] after:top-0 after:bottom-0 after:left-[15px] after:absolute"
                            ></Link>
                          </article>
                        </div>
                        <div className="posts-navigation__next w-full min-h-[50%] flex float-right text-right relative after:clear-both">
                          <article className="w-[calc(100%+15px)] h-full bg-transparent pr-[15px] -mr-[15px] flex relative overflow-hidden">
                            {" "}
                            <div className="post__thumb absolute w-full h-full">
                              <Link to={"#"} className="w-full h-full">
                                <img
                                  src={require("../images/post-overlay2.jpg")}
                                  className="w-full h-full object-cover"
                                ></img>
                              </Link>
                            </div>
                            <div className="post__text p-0 flex items-end min-h-[200px] z-[1] pointer-events-none w-full relative text-white">
                              <div className="post__text-wrap w-full pr-[15px]">
                                <div className="post__text-inner tablet:px-5 pt-0 tablet:pb-5 makbook:px-[25px] makbook:pb-[25px] -mr-[15px] relative">
                                  <Link
                                    to={"#"}
                                    className='tablet:py-2 tablet:pl-3 tablet:pr-[35px] tablet:-mr-[35px] float-right bg-[#607027] h-auto w-fit block leading-[1] relative -mr-[40px] pl-10 text-white mb-[15px] after:content-[""] after:absolute after:top-full after:right-0 after:border-[15px] after:border-transparent after:border-solid after:border-r-0 after:text-[55px] after:z[1]'
                                  >
                                    Next Article
                                  </Link>
                                  <h3 className="mb-0 whitespace-normal break-words font-medium text-white pointer-events-auto text-[1.15rem] leading-[1.4]">
                                    <Link
                                      to={"#"}
                                      className="text-white inline-block"
                                    >
                                      Shoot for the Moon and if You Miss You
                                      Will Still Be Among the Stars
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <Link
                              to={"#"}
                              className="link-overlay absolute top-0 right-0 bottom-0 left-0 block after:bg-[#333] after:content-[''] after:w-[calc(100% - 15px)] after:-z-[1] after:top-0 after:bottom-0 after:left-[15px] after:absolute"
                            ></Link>
                          </article>
                        </div>
                      </div>
                    </div>
                    <div className="comments-section"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
