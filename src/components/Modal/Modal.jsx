import { gsap } from 'gsap';
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react';

const Modal = ({ children }) => {

    const containerRef = useRef(null);


    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
    }, [])

    return (
        <div className='backdrop-blur h-screen w-screen flex justify-center items-center fixed top-0' ref={containerRef}>
            {children}
        </div>
    );
};

export default Modal;

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}