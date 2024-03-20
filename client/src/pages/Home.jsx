import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { initializeApp } from "firebase/app";

import { fetchPexelAPI } from "../utils";
import { SwalError } from "../components/Alert";
import { Card } from "../components";

export default function Home() {
  const [ip, setIp] = useState([]);
  const [initPage, setInitPage] = useState(1);

  const fetchPictures = async (initPage) => {
    try {
      const { next_page, page, per_page, photos } = await fetchPexelAPI(
        initPage,
        50,
      );
      console.log(photos);
      setIp((prevIp) => [...prevIp, ...photos]);
    } catch (error) {
      SwalError(error);
    }
  };

  const loadPicture = () => {
    setInitPage((prev) => prev + 1);
    fetchPictures(initPage);
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <InfiniteScroll
      className="flex flex-wrap justify-center gap-5 p-3 lg:justify-evenly"
      dataLength={ip.length}
      next={loadPicture}
      hasMore={true}
      loader={
        <span className="loading loading-spinner loading-lg fixed bottom-1/2 text-info"></span>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {ip?.map((picture, index) => (
        <Card picture={picture} key={`${index}${picture.id}`} />
      ))}
    </InfiniteScroll>
  );
}
