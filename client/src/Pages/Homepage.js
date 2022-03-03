import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Config from '../config';
import { setPosts } from '../Store/posts/postsActions';

const Homepage = () => {

    const navigate= useNavigate();
    // const dispatch= useDispatch();
    // let posts=useSelector(state=>state.posts);
    let [posts,setPosts]= useState([]);
    let [users,setUsers]= useState([]);
    let [otherUserEmail,setOtherUserEmail] =useState();
    
    
    useEffect(() => {
        if(!localStorage.getItem('token')) {navigate('/login');}
        
            axios.get(`${Config.API}posts/`, {
                headers: {
                token:localStorage.getItem('token')
                }
              }
            ).then(res=>{
                // dispatch(setPosts(res.data.data));
                setPosts(res.data.data);
                });
        
        axios.get(`${Config.API}users`, {
            headers: {
            token:localStorage.getItem('token')
            }
          }
        ).then(res=>{
            setUsers(res.data.data);
           });
    
    }, []);

    const displayUserPosts=(id)=>{
        axios.get(`${Config.API}posts/user-posts/${id}`, {
            headers: {
            token:localStorage.getItem('token')
            }
          }
        ).then(res=>{
            setPosts(res.data.data);
            console.log(res.data.data);});
    
    
    }

    return (
        <div>
            <div className='container-fluid'>
               <div className='text-center mt-2'>
               <h3 className='text-muted ms-auto'>{otherUserEmail||"My Posts"}</h3>
               </div>
            <div className='row  mt-3'>
                <div className='col-10'>

                <div className=' ms-auto row  '>
{   posts.length>0 &&
              posts.map((post,index)=>(

                  <div className="card col-md-3 col-lg-4 shadow  text-center " key={index} >
                <div className="card-body ">
                    <h5 className="card-title text-muted">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 ">User ID: {post.userId}</h6>
                    <p className="card-text">
                    {post.body}
                    </p>
                    <h6 className="card-subtitle mb-2 text-muted">Post ID : {post.id}</h6>
                    <a href="#" className="card-link">
                    Card link
                    </a>
                    <a href="#" className="card-link">
                    Another link
                    </a>
                </div>
                </div>
                    ))      
}
                </div>
                </div>
                
                <div className='col-2 bg-light py-2  overflow-auto  shadow' style={{height:"150vh"}}>
                    {users&&
                    users.map((user,index)=>(

                        <div key={index} className="list-group">
                    <button
                        onClick={()=>{displayUserPosts(user.id);setOtherUserEmail(user.email)}}
                        className="list-group-item list-group-item-action bg-success fw-bold text-white m-1 h-75"
                        aria-current="true" >
                        {user.email}
                    </button>
    
                    </div>
                            ))
                    }




                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Homepage;
