import React from "react";

const LivePreview = ({
  selectedBackground,
  selectedBody,
  selectedBeak,
  selectedEyes,
  selectedOutfit,
}) => {
  const isEmpty =
    !selectedBackground &&
    !selectedBody &&
    !selectedBeak &&
    !selectedEyes &&
    !selectedOutfit;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {isEmpty && (
        <p className="text-lg font-semibold text-gray-500">
          Make a selection to get started
        </p>
      )}
      {selectedBackground && (
        <img
          src={selectedBackground.imageurl}
          alt="Background"
          className="absolute inset-0 rounded-l-[4px] object-cover"
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
