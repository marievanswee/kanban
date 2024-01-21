import {useDrop} from "react-dnd";
import {statusArray, statusColor} from "./Form";
import {Card} from "./Card";
import {useMoveTo} from "../utils/hooks";

export const ItemTypes = {
    CARD: 'card'
}

export const Column = (props) => {
    const {cards, status, handleDisplayError} = props;
    const { moveTo } = useMoveTo();

    const [{ isOver }, dropRef] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop: async (item) => {
                try {
                    await moveTo(item.id, status);
                    window.location.reload();
                } catch (error) {
                    handleDisplayError(error);
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    )

    return (
        <>
            <div className={`flex flex-col gap-4 w-80 ${isOver ? "bg-slate-200" : ""}`} ref={dropRef}>
                <div className={`text-center ${statusColor[status]}`}>
                    {statusArray[status]}
                </div>
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </>
    );
};
