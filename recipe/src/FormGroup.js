import React from "react";
import "./FormGroup.css";

export default function FormGroup({ label, type = "text", value, onChange, placeholder, name, ...rest }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}