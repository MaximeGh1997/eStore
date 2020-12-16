import React from 'react'

const Select = ({name, value, error = "", label, onChange, children}) => {
    return ( 
        <div className="form-group text-poppins text-dark">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} className={"form-control" + (error && " is-invalid")} value={value} onChange={onChange}>
                {children}
            </select>
            {error && (
                <p className="invalid-feedback">{error}</p>
            )}
        </div>
     );
}
 
export default Select;