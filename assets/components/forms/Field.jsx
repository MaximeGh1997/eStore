import React from 'react'

const Field = ({name, label, value, onChange, placeholder = "", type, error="", step="", required=null}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
                name={name}
                id={name}
                step={step}
                className={"form-control" + (error && " is-invalid")}
                required = {required}
            />
            {error && (
                <p className="invalid-feedback">{error}</p>
            )
            }
        </div>
     );
}
 
export default Field