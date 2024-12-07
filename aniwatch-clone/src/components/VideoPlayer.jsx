// import cricket from "/videos/cricket.mp4";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";

// export function VideoPlayer() {
//   return <div></div>;
// }

const VideoPlayer = ({ fileId }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (fileId) {
      fetch(`http://localhost:3000/stream/${fileId}`).then((response) => {
        setVideoUrl(response.url);
      });
    }
  }, [fileId]);

  return (
    <div className="">
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls height="" width="100%" />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
