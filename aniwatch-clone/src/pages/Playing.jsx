import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Recomended } from "../components/Recomended";
import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";

export function Playing() {
  const [episodes, setEpisodes] = useState([]);
  const [videoId,setVideoId] = useState("")
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    fetch("http://localhost:3000/getAllEpisodes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: state.id,
      }),
    }).then(async (res) => {
      const result = await res.json();
      setEpisodes(result);
      setVideoId(result[0].CDN_id)
    });
  }, []);

  return (
    <div className="bg-[#242424]">
      <Header />
      <div className="m-12 flex bg-[#2E3234] p-2">
        <div className="h-full w-72 overflow-y-scroll">
          <div className="flex items-center justify-between mb-2 font-bold text-white">
            <h5 className="ml-2">List of episodes: </h5>
            <input
              className="text-black font-normal p-1 rounded-md text-sm mr-2 h-6 w-24"
              type="text"
              placeholder="No. of episode"
            />
          </div>
          <div className="text-white flex flex-col">
            {episodes.map((ep,key) => (
              <button key={key} onClick={()=>setVideoId(ep.CDN_id)} className="border-y border-gray-300 cursor-pointer p-4 list-decimal">
                {ep.Title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-[80%]">
          <VideoPlayer fileId={videoId} />
        </div>
      </div>
      <Recomended />
    </div>
  );
}
