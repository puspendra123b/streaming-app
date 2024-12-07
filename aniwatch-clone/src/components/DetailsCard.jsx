
import { useNavigate } from "react-router-dom";

export function DetailsCard({ prop }) {
  const navigate = useNavigate();
  return (
    <div className="m-1">
      <div>
        <a
          onClick={() =>
            navigate(`/watch/anime`, {
              state: { id: prop.id },
            })
          }
        >
          <img
            className="max-h-[300px] w-[220px] cursor-pointer"
            src={prop.imageUrl}
            alt=""
          />
        </a>
      </div>
      <div className="font-bold text-white mt-1 overflow-hidden max-w-[220px]">{prop.Title}</div>
      <div className="mt-1 text-[#6B7478]">
        {"TV"} | {"HD"}
      </div>
    </div>
  );
}
