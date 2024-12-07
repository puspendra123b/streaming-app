import one from "/images/onepiece.jpg";

export function SideCard({ prop }) {
  return (
    <div
      className="flex items-center text-white"
    >
      <h3
        className="ml-3 text-xl font-semibold"
      >
        01
      </h3>
      <div
        className="flex items-center border-b"
      >
        <img
          className="h-20 w-14 rounded m-2"
          src={one}
          alt="One Piece"
        />
        <h4
          className="text-xl font-semibold w-24"
        >
          One Piece
        </h4>
      </div>
    </div>
  );
}
