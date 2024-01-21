export const Input = (props) => {
    const {type, defaultValue, readOnly, handleChange} = props;

    const handleChangeInput = (event) => {
        handleChange(event.target.value);
    }
    return (
        <div>
            <input className="border-2 rounded text-lg p-1 w-full" type={type} defaultValue={defaultValue} readOnly={readOnly} onChange={handleChangeInput}/>
        </div>
    )
}
