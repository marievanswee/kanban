import {apiPrefix} from "./constants";
import {useEffect, useState} from "react";

export function useFetchTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(apiPrefix+'tasks')
            .then((res) => res.json())
            .then((data) => {
                setError(data.error)
                setLoading(false)
                setTasks(data.message);
            })
    }, []);

    return {tasks, loading, error};
}

export function useFetchTaskById(id) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiPrefix + id);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }

                const data = await response.json();
                setTask(data.message);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            setLoading(false);
            setError(null);
            setTask(null);
        };
    }, [id]);

    return { task, loading, error };
}


export function useMoveTo() {
    const [task, setTask] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const moveTo = async (id, status) => {
        setLoading(true);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        };

        try {
            const response = await fetch(apiPrefix + "goto/" + id, requestOptions);
            if (!response.ok) {
                let error = await response.json();
                setError(error.error);
                throw new Error(error.error);
            }
            const data = await response.json();

            setTask(data.message);
        } finally {
            setLoading(false);
        }
    };

    return { moveTo, task, loading, error };
}

export function usePostTask() {
    const [card, setCard] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const postTask = async (task) => {
        setLoading(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task : {
                    title: task.title,
                    description: task.description,
                    status: task.status
                }
            })
        };

        try {
            const response = await fetch(apiPrefix, requestOptions);
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            const data = await response.json();

            setError(data.error);
            setCard(data.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { postTask, card, loading, error };
}

export function useUpdateTask() {
    const [card, setCard] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateTask = async (task, id) => {
        setLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task : {
                    title: task.title,
                    description: task.description,
                    status: task.status
                }
            })
        };

        try {
            const response = await fetch(`${apiPrefix}${id}`, requestOptions);
            if (!response.ok) {
                let error = await response.json();
                setError(error.error);
                throw new Error(error.error);
            }
            const data = await response.json();

            setCard(data.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateTask, card, loading, error };
}

export function useDeleteTask() {
    const [tasks, setTasks] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deleteTask = async (id) => {
        setLoading(true);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const response = await fetch(`${apiPrefix}${id}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            const data = await response.json();

            setError(data.error);
            setTasks(data.message);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { deleteTask, tasks, loading, error };
}
