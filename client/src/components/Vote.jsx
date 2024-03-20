import React from 'react'
import { PiArrowFatUpBold } from "react-icons/pi";

export default function Vote({id}) {

  console.log(id);
  return (
    <div className="flex flex-col items-center w-full gap-3 z-10">
    <div className="flex gap-5">
      <div className="flex flex-col justify-center items-center">
        <PiArrowFatUpBold
          className="text-4xl text-primary font-bold hover:text-[38px]"
          // onClick={postUpVote}
        />
        {/* <p className="text-xl font-bold text-primary">{Votes.filter((el) => el.vote == 2).length}</p> */}
      </div>
      <div className="flex flex-col justify-center items-center">
        <PiArrowFatUpBold
          className="text-4xl font-bold text-warning hover:text-[38px] rotate-180"
          name="vote"
          value={1}
          // onClick={postDownVote}
        />
         {/* <p className="text-xl font-bold text-warning">{Votes.filter((el) => el.vote == 1).length}</p> */}
      </div>
    </div>
  </div>
  )
}
