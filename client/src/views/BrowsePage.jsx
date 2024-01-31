import { useEffect, useState } from "react";
import AddWordButton from "../components/AddWordButton";
import PackListItem from "../components/PackListItem";
import packService from "../services/packService";

const BrowsePage = () => {
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    const getPacks = async () => {
      const response = await packService.getAll();
      setPacks(response.data);
    };
    getPacks();
  }, []);

  return (
    <div className="h-screen p-6">
      <ul className="w-full pt-28 flex justify-center gap-6">
        {packs.length > 0 &&
          packs.map((pack, index) => {
            if (packs.length === index + 1) {
              return (
                <li key={index}>
                  <PackListItem pack={pack} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <PackListItem pack={pack} />
                </li>
              );
            }
          })}
      </ul>
      <AddWordButton />
    </div>
  );
};

export default BrowsePage;
