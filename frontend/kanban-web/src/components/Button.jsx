import {useState} from "react";

export const Button = (props) => {
    const {title, color, handleClick} = props;
    const handleClickButton = () => {
        handleClick();
    }



    return (
        <div>
            <button
                    className={color + " font-medium rounded-full text-sm px-5 py-2.5 text-center"}
                    onClick={handleClickButton}>{title}</button>
        </div>
    )
}

