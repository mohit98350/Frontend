import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { postDetails , postComment } from "../store/asyncMethods/PostMethod"
import htmlToFormattedText from "html-to-formatted-text";
import Helmet from "react-helmet";
import Loader from "./Loader"
import moment from "moment";
import Comments from "./Comments";
const Details = () => {
    const { id } = useParams();
    const [comment , setComment] = useState('');
    const { user } = useSelector(state => state.AuthReducer);
    const { loading, details,comments } = useSelector(state => state.PostReducer)
    const dispatch = useDispatch();
    const addComment = e =>{
        e.preventDefault();
        dispatch(postComment({id:details._id,comment,userName:user.name}));
        setComment('');
        dispatch(postDetails(id))
    }
    useEffect(() => {
        dispatch(postDetails(id))
    }, [id])
    return (
        <div className="container">
            <div className="row mt-100">
                <div className="col-8">
                    {!loading ? <div className="post__details">
                        <Helmet>
                            <title>{details.title}</title>
                        </Helmet>
                        <div className="post__header">
                            <div className="post__header__avator">
                                {details.userName ? details.userName[0] : ''}
                            </div>
                            <div className="post__header__user">
                                <span>{details.userName}</span>
                                <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                            </div>
                        </div>
                        <div className="post__body">
                            <h1 className="post__body__title">
                                {details.title}
                            </h1>
                            <div className="post__body__details">
                                {htmlToFormattedText(details.body)}</div>

                        </div>
                        <div className="post__body__image">
                            <img src={`/images/${details.image}`} alt="image" />
                        </div>
                        {user?
                        <>
                        <div className="post__comment">
                            <form onSubmit={addComment}>
                                <div className="group">
                                <input type="text" className="group__control"
                                 placeholder="Write a Comment......"
                                 onChange={(e)=>setComment(e.target.value)}
                                 value={comment}
                                 />
                                </div>
                                <div className="group">
                                    <input type="submit" value="Post Comment" className=" btn btn-default"/>
                                </div>
                                
                            </form>
                        </div>
                        <Comments comments={comments}/>
                        </>
                        :''}
                        
                    </div>
                   
                    : <Loader />}

                </div>
            </div>
        </div>
    )
}
export default Details