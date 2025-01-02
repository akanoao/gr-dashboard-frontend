import React, { useState } from "react";
import CertificateUploader from "../components/CertificateUploader";

const CertificateDashboard = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
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
            <button className="bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600">
              View Sample Row
            </button>
            <button className="bg-purple-500 text-white py-2 px-4 rounded-md shadow hover:bg-purple-600">
              Submit
            </button>
          </div>
          {csvFile && (
            <div className="mt-4 text-gray-700">
              <p>
                <b>Uploaded CSV:</b> {csvFile.name}
              </p>
            </div>
          )}
        </div>

        {/* email preview */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full max-w-full lg:max-w-[48%]">
          <h2 className="text-gray-900 font-bold text-lg mb-4">
            Email Preview
          </h2>
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
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600">
              Send Email
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-6xl mt-6">
        
      {/* certificate image */}
          <CertificateUploader />
        {/* mail draft for review */}
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6 w-full max-w-full lg:max-w-[48%] flex flex-col">
          <div className="mb-4">
            <p className="text-gray-700 text-sm mb-2">Progress:</p>
            <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: "77%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              15/45 Mails Sent
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="font-semibold text-gray-900">
              architkohl321@gmail.com
            </p>
            <p className="text-gray-700 text-sm mb-2">
              Subject: {subject || "Your certificate awaits!"}
            </p>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">
              {body ||
                "Hey Archit! \nWe are thrilled to inform you that you have successfully completed the online session on Open Source hosted by Geek Room. Your participation and enthusiasm made the event a great success! \n \nThank you for being a part of the session. \n \nBest Regards, \nGeek Room"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDashboard;
