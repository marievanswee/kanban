import {Board} from "../components/Board";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const Main = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-12">
                <Board/>
            </div>
        </DndProvider>
    )
}
