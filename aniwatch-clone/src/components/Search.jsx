import logo from "/images/logo.png";

export function Search() {
  return (
    <div className="flex flex-col justify-center">
      <img className="h-12 w-36 m-3" src={logo} alt="aniwatch" />
      <div className="flex">
        <input
          type="text"
          placeholder="Search anime..."
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <button className="bg-[#ffdd95] h-11 w-10 rounded-full flex justify-center items-center ml-1">
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
            class="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>

      <p className="text-white">
        <b>Top search: </b>{" "}
        <i>
          {" "}
          Solo Leveling, One Piece, Ninja Kamui, Mashle: Magic andMuscles Season
          2, Jujutsu Kaisen 2nd Season, Naruto: Shippuden, Classroom of the
          Elite III, Mashle: Magic and Muscles, Attack on Titan{" "}
        </i>
      </p>
    </div>
  );
}
