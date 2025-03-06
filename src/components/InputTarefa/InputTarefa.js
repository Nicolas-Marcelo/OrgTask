import React from "react";

function InputTarefa ({type='text', placeholder, onChange, value}) {
    return(
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
    );
}

export default InputTarefa;