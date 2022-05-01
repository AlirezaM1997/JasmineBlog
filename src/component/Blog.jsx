import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "./Loading";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogInfo, setBlogInfo] = useState();
  const { id } = useParams();
  //   const { currentBlogId } = useAllState();
  useEffect(() => {
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
                  className="w-full h-full absolute inset-0 object-cover"
                  src={blogInfo.imgurl}
                  alt="img"
                />
              </div>
            </div>

            <article className="max-w-prose mx-auto py-8">
              <h1 className="text-2xl text-center font-bold">
                {blogInfo.title}
              </h1>
              <h2 className="mt-2 text-lg text-center text-gray-500">
                {blogInfo.creator.name}
              </h2>
              <p className="mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ornare justo felis, nec lobortis augue luctus et. Sed nibh
                metus, posuere non elit nec, rutrum imperdiet justo. Cras ut
                nunc felis. Nunc rhoncus faucibus ultrices. Suspendisse ut
                consectetur nulla. Pellentesque mattis, ligula at pellentesque
                tempor, nisl elit porta lectus, eu bibendum arcu purus eget
                urna. Phasellus euismod at elit vel convallis. Nullam porttitor
                mauris risus, eget hendrerit nisl tincidunt vel. Phasellus at
                dolor dui. Aliquam commodo tellus dolor. Sed purus nunc, laoreet
                quis elementum at, elementum at nisl. Praesent ut rhoncus orci.
                Curabitur sit amet est non dolor porttitor facilisis. Nullam
                velit tortor, iaculis eget vehicula quis, sollicitudin id magna.
              </p>
            </article>
          </main>
        </div>
      )}
    </>
  );
}

