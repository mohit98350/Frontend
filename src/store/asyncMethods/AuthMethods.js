import axios from "axios";
import { SET_LOADER,CLOSE_LOADER,SET_TOKEN,REGISTER_ERRORS, LOGIN_ERRORS} from "../types/UserTypes";
export const postRegister = (state)=>{
   return async(dispatch)=>{
    const config ={
        headers:{
            "Content-Type":'application/json',
        },
    };
    dispatch({type:SET_LOADER})
    try{
        const {data}=await axios.post('https://express-server1.herokuapp.com/register',state,config); //sending request to backend
        dispatch({type:CLOSE_LOADER})
        localStorage.setItem('myToken',data.token);
        dispatch({type:SET_TOKEN,payload:data.token});
        
    }
    catch(error){
        dispatch({type:CLOSE_LOADER})
        dispatch({type:REGISTER_ERRORS,payload:error.response.data.errors})
        console.log(error.response)
    }
   }
    
}
export const postLogin = (state)=>{
    return async(dispatch) =>{
    const config ={
        headers:{
            "Content-Type":'application/json',
        },
    };
    try{
        dispatch({type:SET_LOADER})
        const {data}= await axios.post('https://express-server1.herokuapp.com/login',state,config);
        console.log(data)
        dispatch({type:CLOSE_LOADER})
        localStorage.setItem("myToken",data.token)
        dispatch({type:SET_TOKEN,payload:data.token})
    }
    catch(error){
        dispatch({type:CLOSE_LOADER})
        dispatch({type:LOGIN_ERRORS,payload:error.response.data.errors})
    }
};
};