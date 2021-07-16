import { useState,useEffect } from "react";
import{Helmet}from "react-helmet";
import { useDispatch ,useSelector} from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import BgImage from "./BgImage";
import { postRegister } from "../../store/asyncMethods/AuthMethods";
const Register = (props)=>{
    const [state,setState] = useState({
        name:'',
        email:'',
        password:'',
    });
    const{loading , registerErrors,user} = useSelector(state =>state.AuthReducer);
    const dispatch = useDispatch();
    const handleInputs= e =>{
        setState({
            ...state,
            [e.target.name]:e.target.value

        });
    };
    const userRegister = async(e) =>{
        e.preventDefault();
        dispatch(postRegister(state));
        
      
    };
    
    useEffect(()=>{
        if(registerErrors.length>0){
            registerErrors.map((error) =>
                toast.error(error.msg)
            );
        }
        
    },[registerErrors,user]);
    
    return(
       <>
       <Helmet>
           <title>User Register</title>
           <meta name="description" content="User Register Form" />
       </Helmet>
       <div className="row mt-80">
           <div className="col-8">
                <BgImage/>
                <Toaster position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        className: '',
                        style: {
                          border: '1px solid #713200',
                          padding: '16px',
                          color: '#713200',
                          fontSize:"14px"
                        },
                      }}/>
           </div>
           <div className="col-4">
        <div className="account">
            <div className="account__section">
                <form onSubmit = {userRegister}>
                <h3 className="form-heading">Register</h3>
                    <div className="group">
                        <input type="text" name="name"
                         className="group__control"
                         placeholder="Enter Name"
                         value={state.name} 
                         onChange={handleInputs}   />
                    </div>
                    <div className="group">
                        <input type="email" 
                        name="email" className="group__control"
                         placeholder="Enter Email"
                         value={state.email} 
                         onChange={handleInputs} />
                    </div>
                    <div className="group">
                        <input type="password" 
                        name="password" className="group__control"
                         placeholder="Create Password"
                         value={state.password}  
                         onChange={handleInputs}  />
                    </div>
                    <div className="group">
                        <input type="Submit" value={loading? "Registering"+'........':'Register'}
                         className="btn btn-default btn-block"/>
                    </div>
                </form>
            </div>
        </div>
           </div>
       </div>
       </>
    )
}
export default Register;