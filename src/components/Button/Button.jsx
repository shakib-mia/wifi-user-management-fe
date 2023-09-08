import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const Button = ({ children, type, processing, onClick }) => {
    const [className, setClassName] = useState("bg-green-600 text-white py-3 rounded hover:bg-green-700 px-5");

    useEffect(() => {

        if (processing) {
            setClassName(state => state + " " + "opacity-50 cursor-not-allowed")
        }

        else {
            setClassName("bg-green-600 text-white py-3 rounded hover:bg-green-700 px-5")
        }

    }, [processing])


    return <button
        className={type === 'submit'
            ? className
            : ""}
        type={type}
        disabled={processing}
        onClick={onClick}
    >
        {children}
    </button>;
};


Button.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    processing: PropTypes.bool,
    onClick: PropTypes.func
}
export default Button;