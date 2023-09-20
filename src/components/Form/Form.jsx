import PropTypes from 'prop-types'

const Form = ({ handleSubmit, children, heading }) => {
    return (
        <form onSubmit={handleSubmit} className='w-screen h-screen flex items-center justify-center'>
            <div className='w-11/12 xl:w-1/3 shadow-2xl p-10 flex flex-col gap-2 justify-center overflow-auto'>
                <h1 className="text-center text-5xl gradient-text font-semibold pb-6">{heading}</h1>
                {children}
            </div>
        </form>
    );
};

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    heading: PropTypes.string
}

export default Form;