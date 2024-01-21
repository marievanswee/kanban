import {Form} from "../components/Form";
import {usePostTask} from "../utils/hooks";
import {useNavigate} from "react-router-dom";

export const CreateTask = () => {
    const { postTask } = usePostTask();
    const navigate = useNavigate();
    const handleCreate = (task) => {
        postTask(task).then(() => {
            navigate('/')
        });
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <Form header="Create task" readOnly={false} handleClick={handleCreate}/>
        </div>
    )
}
