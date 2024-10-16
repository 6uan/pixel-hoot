import React from "react";
import { Link } from "react-router-dom";
import LivePreview from "./LivePreview";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import gem from "../assets/gem.svg";

const HootCard = ({ item, handleDelete }) => {
  return (
    <div className="flex h-[583px] flex-col items-center rounded-md border-4">
      {/* Custom Item Image */}
      <LivePreview
        selectedBackground={{ imageurl: item.background }}
        selectedBody={{ imageurl: item.body }}
        selectedBeak={{ imageurl: item.beak }}
        selectedEyes={{ imageurl: item.eyes }}
        selectedOutfit={{ imageurl: item.outfit }}
        className={"rounded-t-sm"}
      />
      {/* Custom Item Text Body */}
      <div className="flex h-fit w-full border-t-4 text-center">
        <div className="flex flex-grow items-center justify-center gap-4">
          <p className="text-2xl font-bold">{item.name}</p>
          <span className="flex items-center gap-1 text-sm font-light">
            <img className="size-5" src={gem} alt="gem" />
            {item.gems}
          </span>
          <p className="text-sm text-gray-600 underline">
            {new Date(item.submittedon).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        <Link
          to={`/edit/${item.id}`}
          className="bg-gray-300 p-4 text-white hover:bg-gray-400"
        >
          <img className="size-7" src={edit} alt="edit" />
        </Link>
        <button
          className="rounded-br-sm bg-red-300 p-4 text-white hover:bg-red-400"
          onClick={() => handleDelete(item.id)}
        >
          <img className="size-7" src={trash} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default HootCard;
