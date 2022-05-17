import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import StarRatingComponent from "react-star-rating-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useAllState } from "../Provider";

export default function Blog() {
  const [theRealID, setTheRealID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogInfo, setBlogInfo] = useState();
  const [comments, setComments] = useState();
  const [allBlogs, setAllBlogs] = useState([]);

  const { id } = useParams();

  const { userInfo } = useAllState();
  const { parsIsoDate } = useAllState();

  const [previous, setPrevious] = useState({
    _id: null,
    imgurl: "",
    title: "",
  });

  const [next, setNext] = useState({
    _id: "",
    imgurl: "",
    title: "",
  });

  const getIndexById = (arr, id) => arr.findIndex((item) => item._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTheRealID(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!theRealID) return;
    const myFunction = async () => {
      const responseBlog = await fetch(
        `http://localhost:4000/blog/single-blog/${id}`
      );
      const thisBlog = await responseBlog.json();
      setBlogInfo(thisBlog);

      const [res1, res2] = await Promise.all([
        fetch(`http://localhost:4000/comment/by-blog/${thisBlog._id}`),
        fetch(`http://localhost:4000/blog/by-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: thisBlog.creatorId,
          }),
        }),
      ]);

      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      setComments(data1);
      setAllBlogs(data2);

      const thisIndex = getIndexById(data2, id);
      const preIndex = thisIndex !== 0 ? thisIndex - 1 : data2.length - 1;
      const nextIndex = thisIndex !== data2.length - 1 ? thisIndex + 1 : 0;

      const preBlogInfo = data2[preIndex];
      const nextBlogInfo = data2[nextIndex];

      setPrevious(preBlogInfo);
      setNext(nextBlogInfo);

      setLoading(false);
    };

    myFunction();
  }, [theRealID]);

  /*/////////////submit comment/////////////*/
  const [commentText, setCommentText] = useState("");
  const cookies = new Cookies();

  const submitComment = async () => {
    if (commentText !== "") {
      fetch(`http://localhost:4000/comment/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          blogId: blogInfo._id,
          text: commentText,
        }),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
        } else {
          throw Error(response.status);
        }
      });
    }
  };

  /*///////////////submitRate///////////////*/
  const { scoreValue } = useAllState();
  const { setScoreValue } = useAllState();
  const { editRate } = useAllState();
  const { setEditRate } = useAllState();

  const submitRate = async (score) => {
    fetch(`http://localhost:4000/blog/submit-rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        blogId: blogInfo._id,
        score: score,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          setScoreValue(score);
          setEditRate(false);
        } else {
          throw Error(response.status);
        }
      })
      .catch((err) => console.log(err));
  };

  if (loading || !previous || !previous._id || !next || !next._id)
    return <Loading />;

  return (
    <>
      <div className="blog-content iphone:pb-[10px]  fablet:pb-[20px]  ">
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

                      <div className="header__content relative flex justify-between font-[system-ui]">
                        <div className="basis-3/4">
                          <Link
                            className="iphone:mb-[10px] font-sans md:mb-[15px] py-[7px] px-[14px] bg-[#607027] text-xs font-normal uppercase text-white mr-2 inline-block"
                            to={`/category/${blogInfo.cat}`}
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
                              <span className="text-yellow-500 mr-1 text-xm font-semibold ">
                                Last Update
                              </span>
                              {parsIsoDate(blogInfo.updatedAt)}
                            </time>
                          </div>
                        </div>
                        <div className="progressBar w-[100px] flex flex-col basis-[15%]">
                          <CircularProgressbar
                            value={blogInfo.averageScore}
                            minValue={0}
                            maxValue={5}
                            text={`${blogInfo.averageScore} of 5`}
                            circleRatio={0.75}
                            styles={buildStyles({
                              rotation: 1 / 2 + 1 / 8,
                              strokeLinecap: "butt",
                              trailColor: "white",
                            })}
                          />
                          <span className="text-sm font-semibold text-center">
                            Rating
                          </span>
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
                      <div className="body sm:px-10 my-[2em] mx-auto text-[#000000b3] leading-[1.6] mt-0 text-[1.14rem] md:text-[1.214rem]">
                        <p
                          className="my-[28px] font-[initial] text-justify"
                          dangerouslySetInnerHTML={{
                            __html: blogInfo.content,
                          }}
                        ></p>
                      </div>

                      <div className="rating flex sm:px-10 sm:flex-row sm:items-center flex-col mb-6 md:justify-end justify-center">
                        <div className="sm:mr-3 sm:pb-2">
                          <p className="font-sans font-semibold">
                            Rate this blog :
                          </p>
                        </div>
                        <div className="">
                          <StarRatingComponent
                            name="rate1"
                            value={scoreValue}
                            onStarClick={(e) => submitRate(e)}
                            editing={editRate}
                          />
                        </div>
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
                          <div className="text-[#888] text-xs font-normal tracking-[1px] flex flex-1 flex-wrap items-center">
                            <ul className="post__tags p-0 inline-block align-middle">
                              {blogInfo.hashtag?.map((item, i) => (
                                <li
                                  key={i}
                                  className="mr-[10px] inline-block leading-[2]"
                                >
                                  <Link
                                    to={`/hashtag/${item.name}`}
                                    className='before:content-["#"] text-[#888] hover:text-black'
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <div className="author-info-and-navigation iphone:block flex flex-wrap mb-[60px] px-14">
                    <div className="author-box shadow-sm iphone:w-full iphone:mb-10 iphone:ml-0 w-[320px] mb-[45px] ml-[45px] min-h-[100px] relative text-center bg-[#fafafa] py-10 px-5 before:md:w-full before:md:h-full before:md:top-[45px] before:md:absolute before:md:-z-[1] before:md:-left-[45px] before:md:bg-[#607027]">
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
                            {blogInfo.creator.name}
                          </Link>
                        </div>
                        <div className="author-bio mb-3 text-[16px] text-[#00000099] font-normal">
                          {blogInfo.creator.bio === ""
                            ? "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod velit eveniet possimus dicta consectetur consequuntur culpa explicabo numquam ut. "
                            : blogInfo.creator.bio}
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
                    <div
                      className={`posts-navigation ml-[30px] iphone:ml-0 p-0 flex-1 mb-0 ${
                        allBlogs.length === 1 ? "hidden" : ""
                      }`}
                    >
                      <div
                        className={`posts-navigation__prev w-full min-h-[50%] flex flex-col mb-[30px] relative after:clear-both ${
                          allBlogs.length === 2 ? "hidden" : ""
                        }`}
                        onClick={() => {
                          setLoading(true);
                          setTheRealID(previous._id);
                        }}
                      >
                        <article className="w-[calc(100%+15px)] h-full bg-transparent pl-[15px] -mx-[15px] flex relative overflow-hidden">
                          <div className="post__thumb absolute w-full h-full">
                            <div className="w-full h-full">
                              <img
                                src={previous.imgurl}
                                className="w-full h-full object-cover"
                              ></img>
                            </div>
                          </div>
                          <div className="post__text flex items-end min-h-[200px] z-[1] pointer-events-none w-full relative text-white">
                            <div className="post__text-wrap w-full pl-[15px]">
                              <div className="post__text-inner tablet:px-5 pt-0 tablet:pb-5 makbook:px-[25px] makbook:pb-[25px] -ml-[15px] relative">
                                <div className='py-2 pr-3 tablet:pl-[35px] makbook:pl-[40px] tablet:-ml-[35px] bg-[#607027] h-auto w-fit block leading-[1] relative -ml-[40px] pl-10 text-white mb-[15px] after:content-[""] after:absolute after:top-full after:left-0 after:border-transparent  after:border-[15px] after:border-t-[#394317] after:border-r-0 after:h-full after:text-[55px] after:z-[1]'>
                                  Previous Article
                                </div>
                                <h3 className="mb-0 whitespace-normal break-words font-medium text-white pointer-events-auto text-[0.85rem] leading-[1.4]">
                                  <div className="text-white inline-block">
                                    {previous.title}
                                  </div>
                                </h3>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${previous._id}`}
                            className="link-overlay absolute top-0 right-0 bottom-0 left-0 block after:bg-[#333] after:content-[''] after:w-[calc(100% - 15px)] after:-z-[1] after:top-0 after:bottom-0 after:left-[15px] after:absolute"
                          ></Link>
                        </article>
                      </div>
                      <div
                        className="posts-navigation__next w-full min-h-[50%] flex float-right text-right relative after:clear-both"
                        onClick={() => {
                          setLoading(true);
                          setTheRealID(previous._id);
                        }}
                      >
                        <article className="w-[calc(100%+15px)] h-full bg-transparent pr-[15px] -mr-[15px] flex relative overflow-hidden">
                          {" "}
                          <div className="post__thumb absolute w-full h-full pr-[15px]">
                            <div className="w-full h-full">
                              <img
                                src={next.imgurl}
                                className="w-full h-full object-cover"
                              ></img>
                            </div>
                          </div>
                          <div className="post__text p-0 flex items-end min-h-[200px] z-[1] pointer-events-none w-full relative text-white">
                            <div className="post__text-wrap w-full pr-[15px]">
                              <div className="post__text-inner tablet:px-5 pt-0 tablet:pb-5 makbook:px-[25px] makbook:pb-[25px] -mr-[15px] relative">
                                <div className='py-2 pl-3 tablet:pr-[35px] makbook:pr-[40px] tablet:-mr-[35px] float-right bg-[#607027] h-auto w-fit block leading-[1] relative -mr-[40px] text-white mb-[15px] after:content-[""] after:absolute after:top-full after:border-transparent after:right-0 after:border-[15px] after:border-t-[#394317] after:border-l-0 after:h-full after:text-[55px] after:z-[1]'>
                                  Next Article
                                </div>
                                <h3 className="mb-0 whitespace-normal break-words font-medium text-white pointer-events-auto text-[0.85rem] leading-[1.4]">
                                  <div className="text-white inline-block">
                                    {next.title}
                                  </div>
                                </h3>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${previous._id}`}
                            className="link-overlay absolute top-0 right-0 bottom-0 left-0 block after:bg-[#333] after:content-[''] after:w-[calc(100% - 15px)] after:-z-[1] after:top-0 after:bottom-0 after:left-[15px] after:absolute"
                          ></Link>
                        </article>
                      </div>
                    </div>
                  </div>
                  <div className="comments-section ">
                    <div className="flex w-full items-center">
                      <div className="w-full bg-white rounded  mx-2 pt-2">
                        <h2 className="py-4 text-gray-800 text-2xl sm:text-left nokia:text-center">
                          Add a new comment
                        </h2>
                        {userInfo ? (
                          <div className="flex flex-wrap -mx-3 mb-6 pb-8 border-b-2 border-[#0000000d]">
                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                              <textarea
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-32 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                name="body"
                                placeholder=""
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                spellCheck="false"
                              ></textarea>
                            </div>
                            <div className="w-full md:w-full flex items-start px-3">
                              <div className="-mr-1">
                                <input
                                  type="submit"
                                  className="bg-[#607027] text-white font-medium py-1 px-4 border rounded tracking-wide mr-1"
                                  onClick={submitComment}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="pb-8 flex sm:justify-start justify-center border-b-2 border-[#0000000d] mb-[2rem]">
                            <div className="flex sm:flex-row flex-col text-center bg-[#fafafa] py-3 px-2 shadow-sm w-fit items-center">
                              <div>
                                <i
                                  className="fa fa-exclamation-triangle"
                                  aria-hidden="true"
                                ></i>
                                <p className="text-base text-gray-600 mx-2 inline-block">
                                  Login to post a comment
                                </p>
                              </div>
                              <Link
                                className="text-blue-400 hover:text-blue-400 mt-[15px] sm:mt-0"
                                to={"/user/login"}
                              >
                                Login Now
                              </Link>
                            </div>
                          </div>
                        )}
                        <div className="mb-2">
                          {comments.map((item, i) => (
                            <div
                              key={i}
                              className="w-full h-full bg-[#fafafa] z-[1] mb-6"
                            >
                              <div className="relative p-3 shadow-sm before:w-full before:h-2/3 before:absolute before:-z-[1] before:right-[15px] before:bg-[#607027]">
                                <div className="mb-2">
                                  <span className="font-bold italic">
                                    {item.user.name} :
                                  </span>
                                  <div className="text-gray-400 text-sm">
                                    {parsIsoDate(item.createdAt)}
                                  </div>
                                </div>
                                <p
                                  className="whitespace-pre"
                                  dangerouslySetInnerHTML={{
                                    __html: item.text,
                                  }}
                                ></p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
