import { useState, useEffect } from 'react';
import { Form } from '../components/Form';
import { useFetchTaskById, useUpdateTask } from '../utils/hooks';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Main} from "./Main";

export const EditTask = () => {
    const { updateTask } = useUpdateTask();
    const { id } = useParams();
    const { task, error } = useFetchTaskById(id);
    const [err, setError] = useState('');
    const [displayError, setDisplayError] = useState(false);

    const navigate = useNavigate();

    const handleEdit = async (updatedTask) => {
        try {
            await updateTask(updatedTask, id)
            navigate('/')
        } catch (error) {
            setError(error.message);
            setDisplayError(true)
            setTimeout(() => {
                setDisplayError(false);
            }, 4000);
        }
    };

    if(error) {
        return <Navigate to={'/'}/>;
    }
    if (!task) {
        return <p>loading...</p>;
    }

    return (

        <div className="h-screen flex flex-col items-center justify-center">
            <div>
                {displayError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{err}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                    </div>
                )}
            </div>
                <Form header="Edit task" readOnly={false} task={task} handleClick={handleEdit} />
        </div>
    );
};
