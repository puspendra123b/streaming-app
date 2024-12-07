import back from "/images/back.webp";
import { Search } from "./Search";

export function Background() {
  return (
    <div className="flex justify-between">
      <Search />
      <img
        style={{
          height: "auto",
          width: "500px",
          marginRight: "3rem",
        }}
        src={back}
        alt="background"
      />
    </div>
  );
}
