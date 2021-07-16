import { Helmet } from "react-helmet";
import { useState ,useEffect} from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useParams,useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateImageAction } from "../store/asyncMethods/PostMethod";
import { RESET_UPDATE_IMAGE_ERROR } from "../store/types/PostTypes";
const EditImage = () => {
    const {id} = useParams();
    const {push}=useHistory();
    const dispatch = useDispatch();
    const {updateImageErrors}=useSelector(state =>state.UpdateImage);
    const {redirect} = useSelector(state =>state.PostReducer);
    const [state, setState] = useState({
        image: '',
        imagePreview: '',
        imageName: 'Choose Image'
    })
    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
            setState({
                ...state, image: e.target.files[0],
                imageName: e.target.files[0].name
            })
            const reader = new FileReader();
            reader.onloadend = () => {
                setState({ ...state,image: e.target.files[0],
             imagePreview: reader.result,imageName: e.target.files[0].name });
        }
        reader.readAsDataURL(e.target.files[0]);
       
        }
       
    }
    const updateImage = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('id',id);
        formData.append('image',state.image);
        dispatch(updateImageAction(formData));
    };
    useEffect(()=>{
        if(updateImageErrors.length !==0){
            updateImageErrors.map(error=>(
                toast.error(error.msg)
            ));
                dispatch({type:RESET_UPDATE_IMAGE_ERROR})

        }
    },[updateImageErrors])
    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    },[redirect])
    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Image</title>
                <meta name="description" content="Update Image" />
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
                <div className="col-6">
                    <div className="card">
                        <h3 className="card__h3">Update Post Image</h3>
                        <form onSubmit={updateImage}>

                            <div className="group">
                                <label htmlFor="image" className="image__label">{state.imageName}</label>
                                <input type="file" name="image" id="image" onChange={fileHandle} />
                            </div>
                            <div className="group">
                                <div className="imagePreview">
                                    {state.imagePreview ? <img src={state.imagePreview} /> : ''}
                                </div>
                            </div>
                            <div className="group">
                                <input type="submit" value="Update image"
                                    className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditImage