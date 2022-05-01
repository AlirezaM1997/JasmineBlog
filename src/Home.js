import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Loading from "./component/Loading";

function Home() {
  const firstNumberArray = [2];
  const secondNumberArray = [3];

  const sequence = () => {
    let i = 2;
    let j;
    let k = 3;
    let w;
    while (i < 1000) {
      j = i + 6;
      firstNumberArray.push(j);
      i = i + 6;
      w = k + 6;
      secondNumberArray.push(w);
      k = k + 6;
    }
  };
  sequence();

  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

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
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-12 px-4 w-96 sm:w-auto">
          <div
            role="main"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-4xl leading-9 text-center text-gray-800 dark:text-gray-50">
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
      </div>
    </>
  );
}

export default Home;

// w-full =>>
// display: flex;
// flex-flow: wrap;
// justify-content: center;
