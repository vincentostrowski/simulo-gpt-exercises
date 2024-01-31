import { useState } from "react";
import packService from "../services/packService";

// Component to display a single wordPack on the browse view
// Provides preview of containing words and download button
const PackListItem = ({ pack }) => {
  const [openPreview, setOpenPreview] = useState(true);

  const handleTogglePreview = () => {
    setOpenPreview((prev) => !prev);
  };

  const handleDownload = () => {
    packService.downloadPack(pack._id);
  };

  return (
    <div>
      <div className="p-1 bg-white">
        <div className="bg-gray-200 h-60 w-60 flex flex-col">
          <div className="bg-white">{pack.name}</div>
          <div
            style={{
              backgroundImage: `url(${pack.coverURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full w-full relative"
          >
            <ul className="p-3">
              {openPreview &&
                pack.words.map((word, index) => {
                  return (
                    <li key={index}>
                      <div>{word}</div>
                    </li>
                  );
                })}
            </ul>
            <div className="flex bg-white gap-4 px-3 py-1 rounded-tr-xl w-1/2 absolute bottom-0 left-0">
              <button className="text-xs" onClick={handleDownload}>
                Download
              </button>
              <button className="text-xs" onClick={handleTogglePreview}>
                Words
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackListItem;
