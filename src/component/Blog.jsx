import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "./Loading";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogInfo, setBlogInfo] = useState();
  const { id } = useParams();
  //   const { currentBlogId } = useAllState();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:4000/blog/${id}`)
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
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <main className="relative container mx-auto bg-white px-4">
            <div
              className="relative top-0 rounded-b-lg overflow-hidden"
              style={{ paddingTop: "25%" }}
            >
              <img
                className="absolute inset-0 object-cover object-top w-full h-full filter blur blogImg"
                src={blogInfo.imgurl}
                alt="img"
              />
            </div>

            <div
              className="lg:w-1/2 w-5/6 mx-auto"
              style={{ marginTop: "-10%" }}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ paddingTop: "56.25%" }}
              >
                <img
                  className="w-full h-full absolute inset-0 object-cover blogSmallImg"
                  src={blogInfo.imgurl}
                  alt="img"
                />
              </div>
            </div>

            <article className="max-w-prose mx-auto py-8">
              <h1 className="text-2xl text-center font-bold">
                {blogInfo.title}
              </h1>
              <Link
                to={`/userblog/${blogInfo.creator._id}`}
                className="w-fit my-8 flex cursor-pointer" style={{width:'fit-content'}}
              >
                <div> 
                  <img
                    src={blogInfo.creator.imgurl}
                    className="inline w-10 h-10 mr-4 rounded-full shadow-2xl border-2"
                    alt="avatar"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="inline-block text-sm text-gray-800 leading-3 tracking-wide italic mb-2">
                    Author
                  </h2>
                  <h2 className="inline text-lg text-gray-800 leading-3 tracking-wide italic">
                    {blogInfo.creator.name}
                  </h2>
                </div>
              </Link>
              <div className="relative border-l-2 border-gray-400 wrapperBlogText">
                <p
                  className="p-3 bg-white blogText"
                  dangerouslySetInnerHTML={{ __html: blogInfo.content }}
                ></p>
              </div>
            </article>
          </main>
        </div>
      )}
    </>
  );
}
