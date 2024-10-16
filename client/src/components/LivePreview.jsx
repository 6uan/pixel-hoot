import React from "react";
import { twMerge } from "tailwind-merge";

const LivePreview = ({
  selectedBackground,
  selectedBody,
  selectedBeak,
  selectedEyes,
  selectedOutfit,
  className, // Accept the className prop
}) => {
  const isEmpty =
    !selectedBackground &&
    !selectedBody &&
    !selectedBeak &&
    !selectedEyes &&
    !selectedOutfit;

  console.log(className);
  return (
    <div
      className={twMerge(
        "relative flex h-full w-full items-center justify-center",
        className
      )}
    >
      {isEmpty && (
        <p className="text-lg font-semibold text-gray-500">
          Make a selection to get started
        </p>
      )}
      {selectedBackground && (
        <img
          src={selectedBackground.imageurl}
          alt="Background"
          className={twMerge("absolute inset-0 object-cover", className)}
        />
      )}
      {selectedBody && (
        <img
          src={selectedBody.imageurl}
          alt="Body"
          className="absolute inset-0"
        />
      )}
      {selectedBeak && (
        <img
          src={selectedBeak.imageurl}
          alt="Beak"
          className="absolute inset-0"
        />
      )}
      {selectedEyes && (
        <img
          src={selectedEyes.imageurl}
          alt="Eyes"
          className="absolute inset-0"
        />
      )}
      {selectedOutfit && selectedOutfit.imageurl && (
        <img
          src={selectedOutfit.imageurl}
          alt="Outfit"
          className="absolute inset-0"
        />
      )}
    </div>
  );
};

export default LivePreview;
