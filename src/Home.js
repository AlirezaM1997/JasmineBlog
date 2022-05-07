import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/home.css";
import Loading from "./component/Loading";
import MySlider from "./component/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook  } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faTwitter,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
function Home() {
  // const firstNumberArray = [2];
  // const secondNumberArray = [3];

  // const sequence = () => {
  //   let i = 2;
  //   let j;
  //   let k = 3;
  //   let w;
  //   while (i < 1000) {
  //     j = i + 6;
  //     firstNumberArray.push(j);
  //     i = i + 6;
  //     w = k + 6;
  //     secondNumberArray.push(w);
  //     k = k + 6;
  //   }
  // };
  // sequence();

  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("http://localhost:4000/blog")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((result) => {
        setBlogs(result);
        setLoading(false);
      });
    console.log();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="site-content transform-none md:pt-10 md:pb-16 py-8">
        <div className="slider-block relative">
          <div className="container mb-16" style={{padding :'0 !important'}}>
            <div className="slider-block_inner relative pt-12 md:px-5 px-0">
              <div className="main-section relative mb-9">
                <MySlider />
                <div className="slideNumber absolute top-0 text-white font-black text-center">
                  <span className="current-slide">01</span>
                  <span className="total-slides">/03</span>
                </div>
              </div>
              <div className="sub-section overflow-hidden">
                <div className="posts-list md:flex block flex-wrap">
                  <div className="list-item p-4 md:w-1/2">
                    <article className="post-overlay pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                      <div className="post__thumb-overlay absolute w-full h-full">
                        <Link to={"#"} className="w-full h-full block">
                          <img
                            className="w-full h-full object-cover align-middle block"
                            src={require("./images/post-overlay1.jpg")}
                          ></img>
                        </Link>
                      </div>
                      <div className="post__text-overlay z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                        <div className="post__text-wrap mb-0 pl-4 relative w-full">
                          <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                            <Link
                              to={"#"}
                              className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                            >
                              fashion
                            </Link>
                            <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                              <Link to={"#"} className="inline-block">
                                Some Men See Things as They Are and Ask Why
                              </Link>
                            </h3>
                            <div className="post__meta my-0 text-sm">
                              <time className="time font-light whitespace-nowrap">
                                Mar 6, 2019
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="list-item p-4 md:w-1/2">
                    <article className="post-overlay pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                      <div className="post__thumb-overlay absolute w-full h-full">
                        <Link to={"#"} className="w-full h-full block">
                          <img
                            className="w-full h-full object-cover align-middle block"
                            src={require("./images/post-overlay2.jpg")}
                          ></img>
                        </Link>
                      </div>
                      <div className="post__text-overlay z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                        <div className="post__text-wrap mb-0 pl-4 relative w-full">
                          <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                            <Link
                              to={"#"}
                              className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                            >
                              House
                            </Link>
                            <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                              <Link to={"#"} className="inline-block">
                                Some Men See Things as They Are and Ask Why
                              </Link>
                            </h3>
                            <div className="post__meta my-0 text-sm">
                              <time className="time font-light whitespace-nowrap">
                                Mar 6, 2019
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aboutSection relative" style={{ marginBottom: "70px" }}>
          <div className="container mx-auto">
            <div className="about__inner pt-40">
              <div className="about__content flex w-full">
                <div className="about__thumb relative flex-none">
                  <div className="background-img absolute overflow-hidden bg-cover bg-no-repeat bg-scroll">
                    <Link to={"#"} className="link-overlay"></Link>
                  </div>
                </div>
                <div className="about__text font-normal flex-grow leading-6">
                  <h3 className="about__title mt-0 font-bold">
                    We Are Better Than Others
                  </h3>
                  <div className="about__bio mb-11 md:max-w-3xl leading-6  opacity-80">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco labori
                  </div>
                  <div
                    className="about__signature"
                    style={{ marginBottom: "55px" }}
                  >
                    <img src={require("./images/signature.jpg")}></img>
                  </div>
                  <ul className="about__social md:text-lg m-0 p-0 list-none text-right">
                    <li className="py-0 inline-block">
                      <Link
                        to={"#"}
                        className="text-inherit inline-block py-0 px-2 leading-5 transition-all"
                      >
                        <span className="social-links__icon rounded-full inline-flex h-5 w-5 relative mx-1 bg-opacity-0 hover:text-gray-600">
                          <FontAwesomeIcon
                            title="Follow us on facebook"
                            icon={faFacebookF}
                          ></FontAwesomeIcon>
                        </span>
                      </Link>
                    </li>
                    <li className="py-0 inline-block">
                      <Link
                        to={"#"}
                        className="text-inherit inline-block py-0 px-2 leading-5 transition-all"
                      >
                        <span className="social-links__icon rounded-full inline-flex h-5 w-5 relative mx-1 bg-opacity-0 hover:text-gray-600">
                          <FontAwesomeIcon
                            title="Follow us on linkedin"
                            icon={faLinkedinIn}
                          ></FontAwesomeIcon>
                        </span>
                      </Link>
                    </li>
                    <li className="py-0 inline-block">
                      <Link
                        to={"#"}
                        className="text-inherit inline-block py-0 px-2 leading-5 transition-all"
                      >
                        <span className="social-links__icon rounded-full inline-flex h-5 w-5 relative mx-1 bg-opacity-0 hover:text-gray-600">
                          <FontAwesomeIcon
                            title="Follow us on twitter"
                            icon={faTwitter}
                          ></FontAwesomeIcon>
                        </span>
                      </Link>
                    </li>
                    <li className="py-0 inline-block">
                      <Link
                        to={"#"}
                        className="text-inherit inline-block py-0 px-2 leading-5 transition-all"
                      >
                        <span className="social-links__icon rounded-full inline-flex h-5 w-5 relative mx-1 bg-opacity-0 hover:text-gray-600">
                          <FontAwesomeIcon
                            title="Follow us on instagram"
                            icon={faInstagram}
                          ></FontAwesomeIcon>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blogList relative">
          <div className="container mx-auto">
            <div className="jasmine-heading relative text-center mb-10">
              <h4 className="heading__title inline-block relative m-0 text-4xl leading-6 pr-12 pl-16 z-10">
                Fashion News
              </h4>
            </div>
          </div>
          <div className="container">
            <div className="blogList__inner">
              <div className="new-posts-list -m-4 flex flex-wrap">
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="new-posts-item">
                  <article className="post-overlay post-overlay-new pl-4 -mx-4 bg-transparent flex relative overflow-hidden">
                    <div className="post__thumb-overlay absolute w-full h-full">
                      <img
                        className="w-full h-full object-cover align-middle block"
                        src={require("./images/post-new.jpg")}
                      ></img>
                    </div>
                    <div className="post__text-overlay post__text-new z-10 pointer-events-none flex items-end pt-10 relative w-full text-white">
                      <div className="post__text-wrap mb-0 pl-4 relative w-full">
                        <div className="post__text-inner px-6 pb-6 -ml-4 relative">
                          <Link
                            to={"#"}
                            className="post__cat-overlay pointer-events-auto absolute block mb-4 text-xs font-normal uppercase text-white mr-2"
                          >
                            House
                          </Link>
                          <h3 className="post__title-overlay text-white font-medium mb-2 whitespace-normal break-words pointer-events-auto">
                            <Link to={"#"} className="inline-block">
                              Some Men See Things as They Are and Ask Why
                            </Link>
                          </h3>
                          <div className="post__meta my-0 text-sm">
                            <time className="time font-light whitespace-nowrap">
                              Mar 6, 2019
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-12 px-4 w-96 sm:w-auto">
          <div
            role="main"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-4xl leading-9 text-center text-gray-800 dark:text-gray-50 border-b-2 border-green-600 pb-4">
              Trial Blog
            </h1>
            <p className="text-base leading-normal text-center text-gray-600 dark:text-white mt-4 md:w-10/12 w-11/12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <section className="lg:flex items-stretch md:mt-12 mt-8">
            <div className="w-full text-center">
              {blogs.map((i, index) =>
                !firstNumberArray.includes(index) &&
                !secondNumberArray.includes(index) ? (
                  <div className="relative rounded-xl md:m-2 my-2 h-64 w-full inline-block shadow-lg smallCard overflow-hidden">
                    <div
                      className="bg-center bg-cover w-full h-full transition-all duration-700 imgCart"
                      style={{
                        backgroundImage: `url(${i.imgurl})`,
                      }}
                    ></div>

                    <div>
                      <p className="p-1 m-5 bg-black text-white rounded text-xs font-medium leading-2 absolute top-0 right-0">
                        <span className="block pb-1">Last Update</span>{" "}
                        <span className="bg-white text-black">
                          {" "}
                          12 April 2022
                        </span>
                      </p>
                      <div className="absolute text-left bottom-0 left-0 p-2 m-3 rounded-xl cartInfo">
                        <h2 className="text-xl font-semibold 5 text-black overflow-hidden">
                          {i.title}
                        </h2>
                        <p className="text-sm leading-4 text-black italic mt-2">
                          {i.creator.name}
                        </p>
                        <Link
                          to={`/blog/${i._id}`}
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-black hover:text-blue-800 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read Blog
                          </p>
                          <svg
                            className="fill-stroke"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-xl md:m-2 my-2 h-64 w-full inline-block largeCard overflow-hidden">
                    <div
                      className="bg-center bg-cover w-full h-full transition-all duration-700 imgCart"
                      style={{
                        backgroundImage: `url(${i.imgurl})`,
                      }}
                    ></div>
                    <div>
                      <p className="p-1 m-5 bg-black text-white rounded text-xs font-medium leading-2 absolute top-0 right-0">
                        <span className="block pb-1">Last Update</span>{" "}
                        <span className="bg-white text-black">
                          {" "}
                          12 April 2022
                        </span>
                      </p>
                      <div className="absolute text-left bottom-0 left-0 p-2 m-3 rounded-xl cartInfo">
                        <h2 className="text-xl font-semibold 5 text-black overflow-hidden">
                          {i.title}
                        </h2>
                        <p className="leading-4 text-sm text-black italic mt-2">
                          {i.creator.name}
                        </p>
                        <Link
                          to={`/blog/${i._id}`}
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-black hover:text-blue-800 hover:underline"
                        >
                          <p className="pr-2 text-sm font-medium leading-none">
                            Read More
                          </p>
                          <svg
                            className="fill-stroke"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.75 12.5L10.25 8L5.75 3.5"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div> */}
    </>
  );
}

export default Home;

// w-full =>>
// display: flex;
// flex-flow: wrap;
// justify-content: center;
