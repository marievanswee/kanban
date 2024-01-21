import {Column} from "./Column";
import {useFetchTasks} from "../utils/hooks";
import {DndContext} from "react-dnd";
import {statusArray} from "./Form";
import {useState} from "react";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";

export const Board = () => {
    const {cards, loading} = useFetchTasks();
    const [displayError, setDisplayError] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddButton = () => {
        navigate('/create');
    }
    const handleDisplayError = (err) => {
        setError(err.message);
        setDisplayError(true)
        setTimeout(() => {
            setDisplayError(false);
        }, 4000);
    }
    return (
            <div>
                <div>
                    <Button title="Add" color="bg-green-700 hover:bg-green-800" handleClick={handleAddButton}/>
                </div>
                <div>
                    {displayError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-center">
                    {statusArray.map((status, index) => (
                        <Column key={index} cards={cards.filter((card) => card.status === index)} status={index} handleDisplayError={handleDisplayError}/>
                    ))}
                </div>
            </div>


    )
}
