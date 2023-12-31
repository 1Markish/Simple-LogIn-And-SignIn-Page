import React ,{useState, useEffect, useCallback} from 'react';
import logo from './Logo(1).png'
import './SignUp.css'


function SignUp(){
    const [inputFields, setInputFields] = useState({
        username:"",
        email:"",
        password:"",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.email.length < 10) {
            errors.email = "Email must be at least 10 characters";
        }
        if (inputValues.password.length < 10) {
            errors.password = "Password must be at least 10 characters";
        }
        if (inputValues.username.length < 5) {
            errors.username = "Username must be at least 5 characters";
        }
        return errors;
    }

    const handleChange = (e) => {
        setInputFields({...inputFields, [e.target.name]:e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(inputFields));
        setSubmitting(true);
    };

    const finishSubmit = useCallback(() => {
        console.log(inputFields);
    }, [inputFields]);

    useEffect(() => {
        if(Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    },[errors, submitting, finishSubmit]);




    return (
        <div className='main'>
            <div className='logo'>
            <img src={logo} alt='podclub-logo'  />
            </div>
            <div className='form-container'>
            <div className='title'>
                <span>Welcome</span>
            </div>
            {Object.keys(errors).length === 0 && submitting ? (
            <span className="success">Successfully submitted ✓</span>
                ) : null}
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username' value={inputFields.username} onChange={handleChange}/>
                    <input type='email' placeholder='Email' value={inputFields.email} onChange={handleChange} />
                    <input type='password' placeholder='Password' value={inputFields.password} onChange={handleChange} />
                    <button>Sign Up</button>
                </form>
                <div className='redirect'>
                    <span >Already have an account ?</span>
                </div>

            </div>
        </div>
    );
}



export default SignUp;