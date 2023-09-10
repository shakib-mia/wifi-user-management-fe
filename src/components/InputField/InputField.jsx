import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'
import { useState } from 'react';

const InputField = ({ id, label, placeholder, type, name, required, value, onChange, containerClassName }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={containerClassName}>
            <label className='ml-2 capitalize' htmlFor={id}>{label}</label>
            <div className='relative'>
                {type !== 'password'
                    ?
                    <input required={required} className='bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white' id={id} placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
                    :
                    <input required={required} className='bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white' id={id} placeholder={placeholder} type={show ? "text" : "password"} name={name} value={value} onChange={onChange} />}
                {type === 'password' && <div className='absolute right-2 top-2'>
                    <label htmlFor={`pass${id}`}>
                        <FontAwesomeIcon className='cursor-pointer' icon={show ? faEye : faEyeSlash} />
                    </label>
                    <input onChange={e => setShow(e.target.checked)} type="checkbox" className='hidden' id={`pass${id}`} />
                </div>}
            </div>
        </div>
    );
};

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    containerClassName: PropTypes.string
}

export default InputField;