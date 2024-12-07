import { DetailsCard } from "../components/DetailsCard";
import { useEffect, useState } from "react";
import { SideTrey } from "../components/SIdeTray";


export function Recomended({ id, Pagename }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getAllCollection", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (res) => {
      const result = await res.json();
      setMovie(result);
      // console.log(result);
    });
  }, []);
  return (
    <div className="p-5 h-full">
      <h2 className="text-[#ffdd95] ml-4 text-2xl font-semibold">
        Recommended for you
      </h2>
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {movie.map((movie) => (
            <DetailsCard prop={movie} />
          ))}
        </div>
        <div className="w-[400px]">
          <SideTrey prop={movie} />
        </div>
      </div>
    </div>
  );
}
