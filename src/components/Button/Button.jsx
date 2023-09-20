import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

const Button = ({ children, type, processing, onClick, className }) => {
    const [style, setStyle] = useState("bg-green-600 text-white py-3 rounded hover:bg-green-700 px-5");

    useEffect(() => {

        if (processing) {
            setStyle(state => state + " " + "opacity-50 cursor-not-allowed")
        }

        else {
            setStyle("bg-green-600 text-white py-3 rounded hover:bg-green-700 px-5")
        }

    }, [processing])


    return <button
        className={type === 'submit'
            ? style
            : className}
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
    onClick: PropTypes.func,
    className: PropTypes.string
}
export default Button;