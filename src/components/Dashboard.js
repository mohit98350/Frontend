import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from "../store/types/PostTypes";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from "react-router-dom";
import { fetchPosts } from "../store/asyncMethods/PostMethod";
import { BsPencil, BsTrash, BsImageFill} from "react-icons/bs";
import axios from "axios";
import moment from "moment";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


const Dashboard = () => {
    const { redirect, message, loading, } = useSelector(state => state.PostReducer);
    const { user: { _id }, token } = useSelector(state => state.AuthReducer);
    const { posts, count, perPage } = useSelector(state => state.FetchPosts);
    let { page } = useParams()
    if (page === undefined) {
        page = 1;
    }
    const dispatch = useDispatch();

    const Del = (id) => {

        confirmAlert({
            title: "Are You Sure To Delete This Post??",

            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePost(id)
                },
                {
                    label: 'No',

                }
            ]
        });


    };

    const deletePost = async (id) => {

        dispatch({ type: SET_LOADER });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data: { msg } } = await axios.get(`/delete/${id}`, config);
            dispatch(fetchPosts(_id, page));
            dispatch({ type: SET_MESSAGE, paylaod: msg });
        }


        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    }

    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }


    }, [message]);
    useEffect(() => {
        dispatch(fetchPosts(_id, page));     //After every operation page is updated..//
    }, [page])
    return <>
        <Helmet>
            <title>Dashboard</title>
            <meta name="description" content="Dashboard" />
        </Helmet>
        <Toaster position="top-center"
            reverseOrder={false}
            toastOptions={{
                className: '',
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    fontSize: "18px",
                },
            }} />
        <div className="container mt-100">
            <div className="row ">

                <div className="col-3 p-15 mr-1">
                    <Sidebar />
                </div>
                <div className="col-9 p-15  mr-2">

                    {!loading ? posts.length > 0 ? posts.map(post => (
                        <div className="dashboard__posts" key={post._id}>
                            <div className="dashboard__posts__title">
                                <Link to={`/details/${post.slug}`}> {post.title}</Link>
                                <span>Published {moment(post.updatedAt).fromNow()}</span>
                            </div>
                            <div className="dashboard__posts__links">
                                <Link to={`/updateImage/${post._id}`}>
                                    <BsImageFill className="icon" />
                                </Link>
                                <Link to={`/edit/${post._id}`}>< BsPencil className="icon" /></Link>
                                <BsTrash onClick={() => Del(post._id)} className="icon" />
                            </div>
                        </div>
                    )) : 'YOU DONT HAVE ANY POST' : <Loader />}
                     <div className="row">
                    <div className="pagination ">
                    <Pagination path="dashboard" page={page} perPage={perPage} count={count} />
                    </div>
                    </div>
                    
                </div>
            </div>
           
        </div>
    </>

};

export default Dashboard;
