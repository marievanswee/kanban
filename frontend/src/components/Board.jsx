import {Column} from "./Column";
import {useFetchTasks} from "../utils/hooks";
import {statusArray} from "./Form";
import {useState} from "react";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";

export const Board = () => {
    const {tasks, loading} = useFetchTasks();
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

    if(loading) {
        return <div>Loading...</div>
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
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-center">
                    {statusArray.map((status, index) => (
                        <Column key={index} cards={tasks.filter((task) => task.status === index)} status={index} handleDisplayError={handleDisplayError}/>
                    ))}
                </div>
            </div>


    )
}
