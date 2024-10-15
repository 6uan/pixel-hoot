import CreateHoot from "./pages/CreateHoot";
import PromptMenu from "./pages/PromptMenu";
import Header from "./components/Header";
import { useRoutes } from "react-router-dom";
import ViewHoots from "./pages/ViewHoots";
import EditHoot from "./pages/editHoot";

function App() {
  const routes = [
    {
      path: "/",
      element: <PromptMenu />,
    },
    {
      path: "/create",
      element: <CreateHoot />,
    },
    {
      path: "/gallery",
      element: <ViewHoots />,
    },
    {
      path: "/edit/:hootId",
      element: <EditHoot />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {element}
    </div>
  );
}

export default App;
