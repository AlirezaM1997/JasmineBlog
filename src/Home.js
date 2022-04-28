import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
  const firstNumberArray = [2, 8, 14, 20];
  const secondNumberArray = [3, 9, 15, 21];

  const firstSequence = () => {
    for (let index = 2; index < 1000; index++) {
      firstNumberArray.push(index + 6);
    }
  };

  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firstSequence();
    console.log(firstNumberArray);
    fetch("http://localhost:4000/blog")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((result) => {
        console.log(result);
        setBlogs(result);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div className="h-screen bg-white">
      <div className="bg-gray-400 p-4 text-center w-1/4 mx-auto rounded-3xl text-white mt-40 text-lg">
        <p>Please wait ....</p>
        <i className="block fa fa-circle-o-notch fa-spin"></i>
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
          <div
            role="main"
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-4xl leading-9 text-center text-gray-800 dark:text-gray-50">
              Trial Blog
            </h1>
            <p className="text-base leading-normal text-center text-gray-600 dark:text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <section className="lg:flex items-stretch md:mt-12 mt-8">
            <div className="w-full text-center">
              {blogs.map((i, index) =>
                !firstNumberArray.includes(index) &&
                !secondNumberArray.includes(index) ? (
                  <div
                    className="relative m-2 h-64 sm:w-1/2 w-full inline-block bg-center bg-cover smallCard"
                    style={{
                      backgroundImage:
                        'url("https://i.ibb.co/DYxtCJq/img-1.png")',
                    }}
                  >
                    <div>
                      <p className="p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2022
                      </p>
                      <div className="absolute text-left bottom-0 left-0 p-6">
                        <h2 className="text-xl font-semibold 5 text-white">
                          {i.title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          {i.creator.name}
                        </p>
                        <Link
                          to={"#"}
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
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
                ) : (
                  <div
                    className="relative m-2 h-64 sm:w-full w-full inline-block bg-center bg-cover largeCard"
                    style={{
                      backgroundImage:
                        'url("https://i.ibb.co/Ms4qyXp/img-3.png")',
                    }}
                  >
                    <div>
                      <p className="md:p-10 p-6 text-xs font-medium leading-3 text-white absolute top-0 right-0">
                        12 April 2021
                      </p>
                      <div className="absolute text-left bottom-0 left-0 md:p-10 p-6">
                        <h2 className="text-xl font-semibold 5 text-white">
                          {i.title}
                        </h2>
                        <p className="text-base leading-4 text-white mt-2">
                          {i.creator.name}
                        </p>
                        <Link
                          to={"#"}
                          className="focus:outline-none focus:underline flex items-center mt-4 cursor-pointer text-white hover:text-gray-200 hover:underline"
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