
import {useState} from "react";
import {Input} from "./Input";
import {Label} from "./Label";
import {Button} from "./Button";

export const Form = (props) => {
    const {header, readOnly, subject, definition, state} = props
    const [title, setTitle] = useState(subject ?? '');
    const [description, setDescription] = useState(definition ?? '');
    const [status, setStatus] = useState(state ?? '');
    const handleChangeTitle = (value) => {
        setTitle(value);
    }
    const handleChangeDescription = (value) => {
        console.log({value});
        setDescription(value);
    }
    const handleChangeStatus = (value) => {
        setStatus(value.target.value);
    }

    const handleSubmit = () => {
        // hook to persist create or update data
    }

    const statusArray = ['To Do', 'Doing', 'Done'];

    return (
        <div className="flex flex-col min-h-96 w-[700px] rounded overflow-hidden shadow-lg lg:flex p-10">

            <h4 className="leading-7 text-xl pb-2 text-center">{header}</h4>
            <div className="space-y-8 p-2">

                <div className="space-y-2">
                    <Label label="Title"/>
                    <Input type="text" defaultValue={title} readOnly={readOnly} handleChange={handleChangeTitle}/>
                </div>

                <div className="space-y-2">
                    <Label label="Description"/>
                    <Input type="text" defaultValue={description} readOnly={readOnly} handleChange={handleChangeDescription}/>
                </div>

                <div className="space-y-2">
                    <Label label="Status"/>
                    {
                        readOnly ?
                        <Label label={statusArray[status]}/> :
                        <select className="border-2 rounded text-lg p-1.5 w-full" name="status" id="status" defaultValue={status} onChange={handleChangeStatus}>
                            {statusArray.map((status, index) => (
                                <option key={index} value={index}>{status}</option>
                            ))}
                        </select>
                    }
                </div>

                <div className="flex flex-row space-x-3">
                    <Button title="Submit" color="text-white bg-blue-700 hover:bg-blue-800" handleClick={handleSubmit}/>
                    <Button title="Cancel" color="text-white bg-gray-500 hover:bg-gray-600" handleClick={handleSubmit}/>
                </div>

            </div>


        </div>
    )
}
