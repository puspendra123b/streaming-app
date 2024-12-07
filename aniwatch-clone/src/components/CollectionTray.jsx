import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CollectionTray() {
  const [collection, setCollection] = useState([]);
  const [deleted, setDeleted] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // setInterval(() => {
    fetch("http://localhost:3000/getAllCollection", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (res) => {
      const result = await res.json();
      setCollection(result);
      console.log(result);
    });
    // },5000);
  }, [deleted]);

  const handleDelete = (givenId, givenImageId) => {
    fetch("http://localhost:3000/deleteCollection", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: givenId,
        Image_id: givenImageId,
      }),
    }).then(async (res) => {
      const result = await res.json();
      result.isSuccess && setDeleted("deleted");
      console.log(result);
    });
  };

  return (
    <div>
      <table className="border">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left">Collection Name</th>
            <th className="p-3 text-left">Collection Description</th>
            <th className="p-3 text-left">Total Episodes</th>
            <th className="p-3 text-left"></th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {collection &&
            collection.map((item) => (
              <tr className="border-b hover:bg-gray-50 max-h-20">
                <td className="px-4 w-72">{item.Title}</td>
                <td className="py-1 w-72 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.Description}
                </td>
                <td className="px-10">{item.No_of_episodes}</td>
                <td className="pr-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/add-episodes`, {
                        state: { id: item.id },
                      })
                    }
                    className="text-blue-500 underline"
                  >
                    View
                  </button>
                </td>
                <td className="pr-4">
                  <button
                    onClick={() => handleDelete(item.id, item.Image_id)}
                    className="text-red-500 underline "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
