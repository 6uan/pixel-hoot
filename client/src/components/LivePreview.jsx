import React from "react";

const LivePreview = ({
  selectedBackground,
  selectedBody,
  selectedBeak,
  selectedEyes,
  selectedOutfit,
}) => {
  return (
    <div className="relative h-full w-full">
      {selectedBackground && (
        <img
          src={selectedBackground.imageurl}
          alt="Background"
          className="absolute inset-0 object-cover"
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
      {selectedOutfit && (
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
