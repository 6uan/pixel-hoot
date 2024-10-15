import CreateHoot from "./components/CreateHoot";
import PromptMenu from "./components/PromptMenu";
import Header from "./components/Header";
import UserGallery from "./components/UserGallery";
import { useRoutes } from "react-router-dom";

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
      element: <UserGallery />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      {element}
    </div>
  );
}

export default App;
