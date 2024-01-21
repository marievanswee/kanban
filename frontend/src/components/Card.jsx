import {Button} from "./Button";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./Column";
import {useNavigate} from "react-router-dom";
import {useDeleteTask} from "../utils/hooks";

export const Card  = (props) => {
    const {card} = props;
    const {deleteTask} = useDeleteTask();
    const navigate = useNavigate();
    const [{ opacity, isDragging }, dragRef] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { id:card.id, status: card.status },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }),
        []
    )

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = (id) => {
        deleteTask(id).then(() => {
            window.location.reload();
        });
    }


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg" ref={dragRef}>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{card.title}</div>
                    <p className="text-gray-700 text-base">
                        {card.description}
                    </p>
                </div>
                <div className="flex flex-row px-6 pt-4 pb-2">
                    <Button title="Edit" color="bg-orange-400 hover:bg-orange-500" handleClick={() => handleEdit(card.id)}/>
                    <Button title="Delete" color="bg-red-600 hover:bg-red-700" handleClick={() => handleDelete(card.id)}/>
                </div>
        </div>
    )
}
