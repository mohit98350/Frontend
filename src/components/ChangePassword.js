import { useState , useEffect } from "react"
import { useHistory } from "react-router";
import Sidebar from "./Sidebar"
import { Helmet } from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "../store/asyncMethods/ProfileMethods";
import { RESET_PROFILE_ERRORS } from "../store/types/ProfileTypes";
import Loader from "./Loader";
const ChangePassword = () => {
    const [state, setState] = useState({
        current: '',
        newPassword: '',
        userId:null
    })
    const dispatch = useDispatch();
    const {loading,redirect}= useSelector(state => state.PostReducer)
    const {updateErrors}=useSelector(state =>state.updateName);
    const {user:{_id}} = useSelector(state => state.AuthReducer);
    const {push}=useHistory();
    
    const updatePassword = (e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({current:state.current,newPassword:state.newPassword,userId:_id}));
    }
    useEffect(()=>{
        if(updateErrors.length!==0){
            updateErrors.map((error) =>toast.error(error.msg));
            dispatch({type:RESET_PROFILE_ERRORS});
        }
    },[updateErrors]);
    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    },[redirect])
    return !loading?
      
        <div className="container mt-100">
            <Helmet>
                <title>Update Password</title>
                <meta name="description" content="Create new password" />
            </Helmet>
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
            <div className="row">
                <div className="col-3 mun-1">
                    <Sidebar />
                </div>
                <div className="col-9 mun-2 ">
                    <div className="card">
                        <h3 className="card__h3">Change Password</h3>
                        <form onSubmit={updatePassword}>
                            <div className="group">
                                <input type="password" name="" className="group__control"
                                    placeholder="Current Password"
                                    onChange={(e) => setState({ ...state, current: e.target.value })}
                                    value={state.current}
                                />
                            </div>
                            <div className="group">
                                <input type="password" name="" className="group__control"
                                    placeholder="New Password"
                                    onChange={(e) => setState({ ...state, newPassword: e.target.value })}
                                    value={state.newPassword}

                                />
                            </div>
                            <div className="group">
                                <input type="submit" value="Update Password"
                                    className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>:<Loader/>;
      
    
}
export default ChangePassword;