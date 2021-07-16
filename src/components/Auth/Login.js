import { useState, useEffect } from "react";
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { postLogin } from "../../store/asyncMethods/AuthMethods";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const { loginErrors,loading } = useSelector(state => state.AuthReducer);
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const handleInputs = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const userLogin = e => {
        e.preventDefault();
        dispatch(postLogin(state));


    };
    useEffect(()=>{
        if(loginErrors.length>0){
            loginErrors.map((error)=>toast.error(error.msg));
        }
    },[loginErrors]);
    
    return (
        <>
            <Helmet>
                <title>User Login</title>
                <meta name="description" content="User Login Form" />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                    <Toaster position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            className: '',
                            style: {
                                border: '1px solid #713200',
                                padding: '16px',
                                color: '#713200',
                                fontSize: "14px",
                            },
                        }} />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={userLogin}>
                                <h3 className="form-heading">Login</h3>

                                <div className="group">
                                    <input type="email" name="email" value={state.email}
                                        className="group__control" placeholder="Enter Email"
                                        onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" value={state.password}
                                        className="group__control" placeholder="Enter Password"
                                        onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="Submit" value={loading? "Logging"+'......':'Login'} className="btn btn-default btn-block" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;