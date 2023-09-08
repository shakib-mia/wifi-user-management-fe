import PropTypes from 'prop-types'

const InputField = ({ id, label, placeholder, type, name, required, value, onChange, containerClassName }) => {
    return (
        <div className={containerClassName}>
            <label className='ml-2' htmlFor={id}>{label}</label>
            <input required={required} className='bg-transparent w-full p-2 focus:outline-none rounded placeholder:text-base shadow-[inset_0_0_10px_#222] text-white' id={id} placeholder={placeholder} type={type} name={name} value={value} onChange={onChange} />
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