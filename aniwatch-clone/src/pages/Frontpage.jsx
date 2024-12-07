import { useNavigate } from "react-router-dom";

import { Background } from "../components/Background";
export function Frontpage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#242424] h-screen pt-12">
      <div className="text-white">
        <a className="cursor-pointer font-bold m-10"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </a>
        <a className="cursor-pointer font-bold m-10"
          onClick={() => {
            navigate("/movies");
          }}
        >
          Movies
        </a>
        <a className="cursor-pointer font-bold m-10"
          onClick={() => {
            navigate("/tv-series");
          }}
        >
          Tv Series
        </a>
        <a className="cursor-pointer font-bold m-10"
          onClick={() => {
            navigate("/most-popular");
          }}
        >
          Most Popular
        </a>
        <a className="cursor-pointer font-bold m-10"
          onClick={() => {
            navigate("/top-airing");
          }}
        >
          Top Airing
        </a>
      </div>
      <div
        className="p-12"
      >
        <Background />
      </div>
    </div>
  );
}

// const styles={
//     topbar : {
//         margin : "100px 20px 40px 40px",
//         fontWeight : "bold",
//         color : "#fff",
//         textDecoration : "none",
//         cursor : "pointer"
//     }
// }
