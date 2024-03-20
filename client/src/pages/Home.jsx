import React from "react";
import InfiniteScroll from "react-infinite-scroller";

export default function Home() {
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={true || false}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {"items"}
    </InfiniteScroll>
  );
}
