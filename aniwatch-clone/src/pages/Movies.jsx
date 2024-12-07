import { DetailsCard } from "../components/DetailsCard";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SideTrey } from "../components/SIdeTray";
import { PageName } from "../components/PageName";

export function Movies({ id, Pagename }) {
  //   [
  //   {
  //     name: "One Piece",
  //     image: "",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Jujustu Kaisen",
  //     platform: "OVA",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  //   {
  //     name: "Naruto",
  //     platform: "TV",
  //     quality: "HD",
  //   },
  // ]
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    // setInterval(() => {
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
    // },5000);
  }, []);

  return (
    <div className="bg-[#242424] h-screen">
      <Header />

      <div>
        <PageName id={id} prop={Pagename} />
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
    </div>
  );
}
