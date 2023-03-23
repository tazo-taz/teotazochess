import Game from "./Game";
import { Routes, Route } from "react-router-dom"
import Home from "./Home";
import Puzzles from "./Puzzles";
import Puzzle from "./Puzzle";
import Test from "./Test";
import CreateBoard from "./CreateBoard";
export default function RoutesPage() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/puzzle/:id" element={<Puzzle />} />
            <Route path="/createboard" element={<CreateBoard />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    )
}
