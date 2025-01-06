import React, { useState, useRef } from "react";
import DOMPurify from "dompurify";

const CertificateDashboard = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [font, setFont] = React.useState<string>("Arial");
  const [color, setColor] = React.useState<string>("black");
  const [size, setSize] = React.useState<string>("16px");
  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        alert("Please upload a valid CSV file.");
        return;
      }
      setCsvFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        console.log("CSV File Content:", reader.result);
      };
      reader.readAsText(file);
    }
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFont(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const [previewContent, setPreviewContent] = useState<{
    subject: string;
    body: string;
    image: string | null;
  } | null>(null);

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
      const processedImage =
        "https://via.placeholder.com/800x400?text=Processed+Image"; // Replace with real backend API response

      const sanitizedSubject = DOMPurify.sanitize(subject);
      const sanitizedBody = DOMPurify.sanitize(body, {
        WHOLE_DOCUMENT: true,
        ALLOWED_TAGS: [
          "html",
          "head",
          "body",
          "style",
          "b",
          "i",
          "u",
          "a",
          "span",
          "div",
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "ul",
          "ol",
          "li",
          "img",
          "button",
          "input",
          "textarea",
          "label",
          "form",
          "select",
          "option",
          "iframe",
          "blockquote",
          "code",
          "pre",
          "hr",
          "br",
          "small",
          "strong",
          "em",
          "svg",
          "path",
        ],

        ALLOWED_ATTR: [
          "style",
          "class",
          "id",
          "href",
          "target",
          "rel",
          "src",
          "alt",
          "title",
          "width",
          "height",
          "type",
          "value",
          "placeholder",
          "name",
          "action",
          "method",
          "rows",
          "cols",
          "for",
          "data-*",
          "aria-*",
          "role",
          "viewBox",
          "d",
        ],
      });

      setPreviewContent({
        subject: sanitizedSubject,
        body: sanitizedBody,
        image: processedImage,
      });
    }, 1000);
  };

  const handleCancelPreview = () => {
    setPreviewContent(null);
  };

  const calculateBoxStyle = () => {
    if (!boundingBox || !imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    const startX = Math.min(boundingBox.startX, boundingBox.endX) * rect.width;
    const startY = Math.min(boundingBox.startY, boundingBox.endY) * rect.height;
    const width = Math.abs(boundingBox.endX - boundingBox.startX) * rect.width;
    const height =
      Math.abs(boundingBox.endY - boundingBox.startY) * rect.height;

    return {
      left: `${startX}px`,
      top: `${startY}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-6xl">
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full max-w-full lg:max-w-[48%]">
          <h2 className="text-gray-900 font-bold text-lg mb-4">How to Use</h2>
          <div className="text-gray-600 space-y-2 break-words">
            <p>Step 1: Create Google Slides Presentation</p>
            <ul className="list-decimal list-inside space-y-1">
              <li>Go to Google Slides and create a new presentation.</li>
              <li>
                Adjust the aspect ratio from <b>File &gt; Page Setup</b>.
              </li>
              <li>Set the certificate image as the presentation background.</li>
              <li>
                Add a text box where you want the full name to appear, and type{" "}
                <b>Full_Name</b>.
              </li>
              <li>
                Save the presentation and copy the URL (e.g.,
                https://docs.google.com/presentation/d/&lt;presentation_id&gt;/edit).
              </li>
              <li>Ensure the email `geekroom-xyz@gmail.com` has access.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 pt-8">
            <button
              onClick={() => document.getElementById("csv-upload")?.click()}
              className="bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600"
            >
              Upload CSV
            </button>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </div>
          {csvFile && (
            <div className="mt-4 text-gray-700">
              <p>
                <b>Uploaded CSV:</b> {csvFile.name}
              </p>
            </div>
          )}
        </div>

        {/* email content */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full max-w-full lg:max-w-[48%]">
          <h2 className="text-gray-900 font-bold text-lg mb-4">Email</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="text-gray-700 font-semibold mb-2 block"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter Subject"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-gray-700 font-semibold mb-2 block"
              >
                Message Body
              </label>
              <textarea
                id="message"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter Message Body"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none h-40 resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 lg:gap-6 w-full max-w-6xl mt-6">
        {/* certificate image */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full max-w-sm md:w-1/2 flex flex-col items-center relative">
          <h2 className="text-gray-900 font-bold text-lg mb-4 text-center">
            Upload Image
          </h2>

          <input
            type="file"
            accept="image/*"
            className="text-sm text-gray-600 mb-4 w-full max-w-xs"
            onChange={handleImageUpload}
          />

          <div className="w-full flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="font-select"
                className="text-gray-700 font-medium"
              >
                Font:
              </label>
              <select
                id="font-select"
                value={font}
                className="border-gray-300 border rounded-md p-2 text-gray-800"
                onChange={handleFontChange}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Calibri">Calibri</option>
                <option value="Comic Sans">Comic Sans</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="color-select"
                className="text-gray-700 font-medium"
              >
                Color:
              </label>
              <select
                id="color-select"
                value={color}
                className="border-gray-300 border rounded-md p-2 text-gray-800"
                onChange={handleColorChange}
              >
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="size-select"
                className="text-gray-700 font-medium"
              >
                Size:
              </label>
              <select
                id="size-select"
                value={size}
                className="border-gray-300 border rounded-md p-2 text-gray-800"
                onChange={handleSizeChange}
              >
                <option value="12px">12px</option>
                <option value="16px">16px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
              </select>
            </div>
          </div>

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
              onClick={handleImageRemove}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handlePreviewAndSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Preview & Submit
      </button>
      {previewContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex lg:flex-row justify-center items-center z-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative p-6 w-11/12 lg:w-3/4 max-h-[90vh] flex flex-col">
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="w-full lg:w-1/2 p-4 border-r border-gray-300 overflow-y-auto max-h-[65vh]">
                <div className="text-left">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    <b>Email Draft</b>
                  </h2>
                  <p
                    className="text-gray-700 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: previewContent.subject,
                    }}
                  ></p>
                  <iframe
                    srcDoc={previewContent.body}
                    className="w-full h-[50vh] border-0"
                    style={{ overflow: "auto" }}
                  ></iframe>
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-4 flex justify-center items-center">
                <img
                  src={previewContent.image || ""}
                  alt="Preview"
                  className="max-w-full max-h-[60vh] object-contain rounded"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4 p-4 border-t border-gray-300">
              <button
                onClick={handleCancelPreview}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Preview Submitted Successfully!")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-gray-700 text-lg mt-20 mb-4">
        Progress: <b>30/45 Mails Sent</b>
      </p>
      <div className="relative w-1/2 h-4 mb-20 bg-gray-300 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: "67%" }}
        ></div>
      </div>
    </div>
  );
};

export default CertificateDashboard;
