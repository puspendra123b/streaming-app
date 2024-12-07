import { useState } from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const UploadVideo = ({collection_id}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadProgress(0);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formdata = new FormData();
    formdata.append("video", selectedFile);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("collection_id", collection_id);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const result = JSON.parse(xhr.responseText);
            resolve(result);
          } else {
            reject(new Error(xhr.statusText));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));

        xhr.open('POST', 'http://localhost:3000/upload', true);
        xhr.send(formdata);
      });

      const result = await uploadPromise;
      
      setFileId(result.fileId);
      setUploadError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(error.message);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex ">
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
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
              Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {isUploading && (
            <div>
              <ProgressBar value={uploadProgress} />
              <p className="text-center text-sm text-gray-600">{uploadProgress}% Uploaded</p>
            </div>
          )}

          {uploadError && (
            <div className="bg-red-100 text-red-800 p-3 rounded-md">
              {uploadError}
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;