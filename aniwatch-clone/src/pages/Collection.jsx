// import { useNavigate } from "react-router-dom"

// export function Collection(){

//     const navigate = useNavigate()

//     return (
//         <div>
//             <h1>Create Collection</h1>
//             <label htmlFor="">Collection Name :</label>
//             <input type="text" placeholder="Collection name" />
//             <label htmlFor="">Collection Description :</label>
//             <input type="text" placeholder="Collection description" />
//             <button onClick={()=>{
//                 navigate('/admin/collection/episodes')
//             }}  >Create Collection</button>
            
//         </div>
//     )
// }

import { useState } from "react";
import { CollectionTray } from "../components/CollectionTray";

export function Collection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !title || !description) {
      alert("Please fill out all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name); // Attach file
    formData.append("title", title); // Add title
    formData.append("description", description); // Add description

    try {
      const response = await fetch("http://localhost:3000/create-collection", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      const result = await response.text();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex ">
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Create Collection</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload
          </button>
        </form>
      </div>
      <div className="max-h-[400px] mx-auto mt-10">
        <CollectionTray />
      </div>
    </div>
  );
}
