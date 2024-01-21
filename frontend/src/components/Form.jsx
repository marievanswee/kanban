
import {useState} from "react";
import {Input} from "./Input";
import {Label} from "./Label";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";

export const statusArray = ['To Do', 'Doing', 'Done'];
export const statusColor = ['bg-gray-400', 'bg-blue-400', 'bg-green-500'];

export const Form = (props) => {
    const {header, readOnly, task, handleClick} = props
    const [title, setTitle] = useState(task?.title ?? '');
    const [description, setDescription] = useState(task?.description ?? '');
    const [status, setStatus] = useState(task?.status ?? 0);
    const navigate = useNavigate();

    const handleChangeTitle = (value) => {
        setTitle(value);
    }
    const handleChangeDescription = (value) => {
        setDescription(value);
    }
    const handleChangeStatus = (value) => {
        setStatus(Number(value.target.value));
    }

    const handleSubmit = () => {
        handleClick({
            title: title,
            description: description,
            status: status
        });
    }

    const handleCancel = () => {
        navigate('/');
    }

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
                    <Button title="Submit" color="bg-blue-400 hover:bg-blue-500" handleClick={handleSubmit}/>
                    <Button title="Cancel" color="bg-gray-400 hover:bg-gray-500" handleClick={handleCancel}/>
                </div>

            </div>


        </div>
    )
}
