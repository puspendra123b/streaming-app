
import { useEffect, useState } from "react";

export function EpisodeTray({collection_id}) {
  const [collection, setCollection] = useState([]);
  const [deleted, setDeleted] = useState("");

  useEffect(() => {
    // setInterval(() => {
      fetch("http://localhost:3000/getAllEpisodes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id : collection_id
        })
      }).then(async (res) => {
        const result = await res.json();
        setCollection(result);
        console.log(result);
      });
    // },5000);
  }, [deleted]);

  const handleDelete = (givenId) => {
    fetch("http://localhost:3000/deleteEpisode", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: givenId,
        collection_id: collection.collection_id,
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
            <th className="p-3 text-left">S. No.</th>
            <th className="p-3 text-left">Episode Name</th>
            <th className="p-3 text-left">Episode Description</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {collection &&
            collection.map((item) => (
              <tr className="border-b hover:bg-gray-50">
                <td className="py-1 w-72">1</td>
                <td className="py-1 w-72">{item.Title}</td>
                <td className="py-1 w-72 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{item.Description}</td>
                <td className="px-10">{item.No_of_episodes}</td>
                <td className="pr-4">
                  <button
                    onClick={() => handleDelete(item.Id)}
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
