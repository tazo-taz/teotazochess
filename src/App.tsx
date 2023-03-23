import { useEffect } from "react";
import RoutesPage from "./pages";
import { useLocalStorage } from "./tJS/customHooks";
import useRedux from "./utils/redux";

function App() {
  const [puzzleLvlLS, setPuzzleLvlLS] = useLocalStorage("puzzleLvl", "1")
  const { setPuzzleLvl, puzzleLvl } = useRedux()


  useEffect(() => {
    puzzleLvlLS && setPuzzleLvl(+puzzleLvlLS)
  }, [puzzleLvlLS, setPuzzleLvl])

  useEffect(() => {
    puzzleLvl && setPuzzleLvlLS(puzzleLvl)
  }, [puzzleLvl, setPuzzleLvlLS])

  return (
    <RoutesPage />
  );
}

export default App;
