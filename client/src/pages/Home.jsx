import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPexelAPI } from "../utils";
import { SwalError } from "../components/Alert";
import { Card } from "../components";
import { ThemeContext } from "../context/ThemeContext";
import randomizer from "../utils/randomizer";

export default function Home() {
  const randomPage = randomizer(1, 50);
  const [ip, setIp] = useState([]);
  const [initPage, setInitPage] = useState(randomPage);

  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;

  const fetchPictures = async (initPage) => {
    try {
      const { next_page, page, per_page, photos } = await fetchPexelAPI(
        initPage,
        50,
      );

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
    fetchPictures(initPage);
  }, []);

  return (
    <InfiniteScroll
      className={`${bgColor} flex flex-wrap justify-center gap-5 p-3 lg:justify-evenly`}
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
