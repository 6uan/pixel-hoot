import { Link } from "react-router-dom";

const PromptMenu = () => {
  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <main className="flex h-auto flex-col rounded-lg border-2">
        <img
          className="rounded-t-md border-2"
          src="https://i.seadn.io/gae/mZrT6sD4XLKVtVNdh8iSsIgG6BYfpsvptpSJZ-bdtSUDWXB-r1eBxbJtcRXfLzsDT5I-Fhasnt5jPoLRMT_pAFiG8PyzKaY8-jMAqA?auto=format&dpr=1&w=512"
        />{" "}
        {/* Combination Preview */}
        <div className="flex h-24 w-full items-center rounded-b-md border-2">
          <Link
            to="/create"
            className="flex h-full w-1/2 items-center justify-center text-3xl font-bold"
          >
            Create Hoot
          </Link>
          <Link
            to="/gallery"
            className="flex h-full w-1/2 items-center justify-center border-l-4 text-3xl font-bold"
          >
            View Gallery
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PromptMenu;
