import Sidebar from "./Sidebar"
import { useState , useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from "react-router";
import { Helmet } from "react-helmet"
import { updateNameAction } from "../store/asyncMethods/ProfileMethods";
import {RESET_PROFILE_ERRORS} from "../store/types/ProfileTypes";
const UpdateName = () => {
    const {push}=useHistory();
    const [userName,setUserName]=useState('');
    const{user:{name,_id}}=useSelector(user=>user.AuthReducer);  //same as using state =>state.AuthReducer//
    const {loading,redirect} =useSelector(state =>state.PostReducer);
    const {updateErrors}=useSelector(state =>state.updateName);
    const dispatch = useDispatch();
    const updateNameMethod = (e)=>{
    e.preventDefault();
    dispatch(updateNameAction({name:userName , id:_id}));
    }
    useEffect(()=>{
        setUserName(name);
    },[]);
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
    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Name</title>
                <meta name="description" content="Update user name" />
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
                <div className="col-9 mun-2">
                    <div className="card">
                        <h3 className="card__h3">
                            Update Name
                        </h3>
                        <form onSubmit={updateNameMethod}>
                            <div className="group">
                                <input type="text" name="" className="group__control" 
                                placeholder="Name.." onChange={(e)=>setUserName(e.target.value)} 
                                value={userName}/>


                            </div>
                            <div className="group">
                                <input type="submit" value="Update Name"
                                    className="btn btn-default btn-block" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateName;