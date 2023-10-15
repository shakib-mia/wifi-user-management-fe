import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'
import { useState } from 'react';

const InputField = ({ id, label, placeholder, type, name, required, value, onChange, containerClassName, maxLength, className, icon }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            {containerClassName ? <div className={containerClassName}>
                {label && <label className='ml-2 capitalize' htmlFor={id}>{label}</label>}
                <div className='relative'>
                    {type !== 'password'
                        ?
                        <input required={required} maxLength={maxLength} className={`${type === 'number' ? 'remove-arrow' : ""} ${className ? className : ""} bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white`} id={id} placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
                        :
                        <input required={required} className={`${type === 'number' ? 'remove-arrow' : ""} ${className ? className : ""} bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white`} id={id} placeholder={placeholder} type={show ? "text" : "password"} name={name} value={value} onChange={onChange} />}
                    {type === 'password' && icon && <div className='absolute right-2 top-2'>
                        <label htmlFor={`pass${id}`}>
                            <FontAwesomeIcon className='cursor-pointer' icon={show ? faEye : faEyeSlash} />
                        </label>
                        <input onChange={e => setShow(e.target.checked)} type="checkbox" className='hidden' id={`pass${id}`} />
                    </div>}
                </div>
            </div> : <>
                {label && <label className='ml-2 capitalize' htmlFor={id}>{label}</label>}
                <div className='relative'>
                    {type !== 'password'
                        ?
                        <input required={required} maxLength={maxLength} className={`${type === 'number' ? 'remove-arrow' : ""} ${className ? className : ""} bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white`} id={id} placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
                        :
                        <input required={required} className={`${type === 'number' ? 'remove-arrow' : ""} ${className ? className : ""} bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white`} id={id} placeholder={placeholder} type={show ? "text" : "password"} name={name} value={value} onChange={onChange} />}
                    {type === 'password' && <div className='absolute right-2 top-2'>
                        <label htmlFor={`pass${id}`}>
                            <FontAwesomeIcon className='cursor-pointer' icon={show ? faEye : faEyeSlash} />
                        </label>
                        <input onChange={e => setShow(e.target.checked)} type="checkbox" className='hidden' id={`pass${id}`} />
                    </div>}
                </div>
            </>}
        </>
    );
};

InputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    containerClassName: PropTypes.string,
    maxLength: PropTypes.number,
    className: PropTypes.string,
    icon: PropTypes.bool
}

export default InputField;