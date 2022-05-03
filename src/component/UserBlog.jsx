import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAllState } from "../Provider";
import Loading from "./Loading";

export default function UserBlog() {
  const [loading, setLoading] = useState(true);
//   const { userId } = useAllState();
//   console.log(userId);
const {id}=useParams()
console.log(id);

  useEffect(() => {
      console.log('!!!!!!!!!');
    fetch(`http://localhost:4000/blog/by-user`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
            console.log(response);
          throw Error(response.status);
        }
      })
      .then((result) => {
        console.log(result);
        setLoading(false);
      });
  }, []);

  return <>{loading ? <Loading /> : <div></div>}</>;
}
