import React, { useState } from "react";

const Context = React.createContext();

export default function Provider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState();
  const [userId, setUserId] = useState();
  const [slideNumber, setSlideNumber] = useState(1);
  const [scoreValue, setScoreValue] = useState();
  const [editRate, setEditRate] = useState(true);
  const [topBlogs, setTopBlogs] = useState();
  const parsIsoDate = (date) => {
    const months = [
      "Janury",
      "Februry",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const a = new Date(date);
    const year = a.getFullYear();
    const month = a.getMonth();
    const day = a.getDay();
    const hour = a.getHours();
    const minutes = a.getMinutes();
    return `${months[month - 1]} ${day} ,${year}-${hour}:${minutes} ${
      hour > 12 ? "PM" : "AM"
    }`;
  };

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        token,
        setToken,
        loading,
        setLoading,
        userId,
        setUserId,
        slideNumber,
        setSlideNumber,
        scoreValue,
        setScoreValue,
        editRate,
        setEditRate,
        parsIsoDate,
        topBlogs,
        setTopBlogs,

      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAllState() {
  return React.useContext(Context);
}
