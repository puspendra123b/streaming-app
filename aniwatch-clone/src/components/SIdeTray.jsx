import { SideCard } from "./SideCard";

export function SideTrey({ prop }) {
  return (
    <div className="bg-[#2F373A] mr-5 min-w-72">
      {prop.map((p) => (
        <div className="flex items-center text-white">
          <h3 className="ml-3 text-xl font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-play"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </h3>
          <div className="flex items-center border-b">
            <img
              className="h-20 w-14 rounded m-2"
              src={p.imageUrl}
              alt="One Piece"
            />
            <h4 className="text-xl font-semibold w-24">{p.Title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
