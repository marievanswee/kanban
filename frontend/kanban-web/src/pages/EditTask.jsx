import {Form} from "../components/Form";

export const EditTask = () => {
    return (
        <div>
            <div>
                <Form header="Create task" readOnly={false} status={1}/>
            </div>
        </div>
    )
}
