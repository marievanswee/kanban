import {Form} from "../components/Form";

export const CreateTask = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Form header="Create task" readOnly={false} status={0}/>
        </div>
    )
}
