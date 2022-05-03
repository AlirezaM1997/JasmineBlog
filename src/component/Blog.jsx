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
              className="relative -mx-4 top-0 overflow-hidden"
              style={{ paddingTop: "25%" }}
            >
              <img
                className="absolute inset-0 object-cover object-top w-full h-full filter blur blogImg"
                src={blogInfo.imgurl}
                alt="img"
              />
            </div>

            <div className="w-1/2 mx-auto" style={{ marginTop: "-10%" }}>
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
                className="w-fit inline-block cursor-pointer"
              >
                <img
                  src={blogInfo.creator.imgurl}
                  className="inline w-8 h-8 mr-4 rounded-full shadow-2xl border-2"
                  alt="avatar"
                />
                <h2 className="inline text-lg text-gray-800 leading-3 tracking-wide italic">
                  {blogInfo.creator.name}
                </h2>
              </Link>
              <p className="mt-6"  dangerouslySetInnerHTML={{ __html: blogInfo.content }}></p>
            </article>
          </main>
        </div>
      )}
    </>
  );
}
