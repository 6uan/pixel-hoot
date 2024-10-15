import CreateHoot from "./components/CreateHoot";
import PromptMenu from "./components/PromptMenu";
import Header from "./components/Header";
import { useRoutes } from "react-router-dom";
import CustomItemsList from "./components/CustomItemList";

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
      element: <CustomItemsList />,
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
