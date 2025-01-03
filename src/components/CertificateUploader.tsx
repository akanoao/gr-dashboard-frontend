import React, { useState, useRef } from "react";

const CertificateUploader: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [boundingBox, setBoundingBox] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
    setBoundingBox(null);
    setPreviewImage(null);
  };

  const handleBoundingBoxRemove = () => {
    setBoundingBox(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!uploadedImage || !imageRef.current || isDrawing) return;

    const rect = imageRef.current.getBoundingClientRect();
    const startX = (e.clientX - rect.left) / rect.width;
    const startY = (e.clientY - rect.top) / rect.height;

    setBoundingBox({ startX, startY, endX: startX, endY: startY });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDrawing || !boundingBox || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const endX = (e.clientX - rect.left) / rect.width;
    const endY = (e.clientY - rect.top) / rect.height;

    setBoundingBox((prev) => (prev ? { ...prev, endX, endY } : null));
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const handlePreviewAndSubmit = () => {
    // Simulate a backend API call to get the processed image
    setTimeout(() => {
      setPreviewImage("https://via.placeholder.com/800x400?text=Processed+Image"); // Replace with real backend API response
    }, 1000);
  };

  const handleCancelPreview = () => {
    setPreviewImage(null);
  };

  const calculateBoxStyle = () => {
    if (!boundingBox || !imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    const startX = Math.min(boundingBox.startX, boundingBox.endX) * rect.width;
    const startY = Math.min(boundingBox.startY, boundingBox.endY) * rect.height;
    const width = Math.abs(boundingBox.endX - boundingBox.startX) * rect.width;
    const height = Math.abs(boundingBox.endY - boundingBox.startY) * rect.height;

    return {
      left: `${startX}px`,
      top: `${startY}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full flex flex-col items-center relative">
      <h2 className="text-gray-900 font-bold text-lg mb-4">Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        className="text-sm text-gray-600 mb-4"
        onChange={handleImageUpload}
      />

      {uploadedImage && (
        <div className={`relative ${previewImage ? "opacity-50" : ""}`}>
          <img
            ref={imageRef}
            src={uploadedImage}
            alt="Uploaded"
            className="max-w-full h-auto"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          {boundingBox && (
            <div
              className="absolute border-2 border-blue-500 bg-transparent"
              style={calculateBoxStyle()}
            ></div>
          )}
          {boundingBox && !isDrawing && !previewImage && (
            <button
              onClick={handleBoundingBoxRemove}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Remove Box
            </button>
          )}
        </div>
      )}

      {uploadedImage && !previewImage && (
        <button
          onClick={handlePreviewAndSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Preview & Submit
        </button>
      )}

      {uploadedImage && !previewImage && (
        <button
          onClick={handleImageRemove}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Remove Image
        </button>
      )}

      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto rounded"
              style={{ maxHeight: "80vh", maxWidth: "90vw", objectFit: "contain" }}
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
              <button
                onClick={handleCancelPreview}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Image Submitted Successfully!")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateUploader;
