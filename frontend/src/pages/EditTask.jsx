import { useState, useEffect } from 'react';
import { Form } from '../components/Form';
import { useFetchTaskById, useUpdateTask } from '../utils/hooks';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {Main} from "./Main";

export const EditTask = () => {
    const { updateTask } = useUpdateTask();
    const { id } = useParams();
    const { task, loading, error } = useFetchTaskById(id);

    const navigate = useNavigate();

    const handleEdit = (updatedTask) => {
        updateTask(updatedTask, id).then((data) => {
            navigate('/');
        });
    };

    if(error) {
        return <Navigate to={'/'}/>;
    }
    if (!task) {
        return <p>loading...</p>;
    }

    return (
        <div className="h-screen flex items-center justify-center">
                <Form header="Edit task" readOnly={false} task={task} handleClick={handleEdit} />
        </div>
    );
};
