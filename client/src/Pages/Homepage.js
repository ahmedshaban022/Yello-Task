import axios from "axios";
import e from "cors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Config from "../config";
import { setPosts } from "../Store/posts/postsActions";

const Homepage = () => {

  const navigate = useNavigate();
  // const dispatch= useDispatch();
  // let posts=useSelector(state=>state.posts);
  let [posts, setPosts] = useState([]);
  let [users, setUsers] = useState([]);
  let [otherUserEmail, setOtherUserEmail] = useState();
  let [currentUserId, setCurrentUserId] = useState();
  let [newPost, setNewPost] = useState();
  let [editPost, setEditPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    axios
      .get(`${Config.API}posts/`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // dispatch(setPosts(res.data.data));
        setPosts(res.data.data);
        setCurrentUserId(res.data.id);
      });

    axios
      .get(`${Config.API}users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      });
  }, []);

  const displayUserPosts = (id) => {
    setPosts([]);
    axios
      .get(`${Config.API}posts/user-posts/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPosts(res.data.data);
      });
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`${Config.API}posts/delete-post/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .get(`${Config.API}posts/`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            // dispatch(setPosts(res.data.data));
            setPosts(res.data.data);
          });
        toast.success("Post Deleted");
        toast.success(res.data.data);
      });
  };

  const handelAddPost = ({ target }) => {
    setNewPost({ ...newPost, [target.name]: target.value });
  };
  const sendNewPost = (e) => {
    e.preventDefault();
    


  axios
  .post(
    `${Config.API}posts/add-post`,
    { ...newPost },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
    )
    .then((res) => {
      let newArr = [...posts, { ...newPost, userId: currentUserId }];
      setPosts(newArr);
      setNewPost("");
      toast.success("Post Added Successfuly");
      e.target.reset();
    })
    .catch((err) => {
      toast.error("somthing went error");
    });
  } 

  const handelEditPost = ({ target }) => {
    setEditPost({ ...editPost, [target.name]: target.value });
  };

  const sendEditedPost = (e) => {
    e.preventDefault();

    axios
      .put(
        `${Config.API}posts/update-post/${editPost._id}`,
        { ...editPost },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        axios
          .get(`${Config.API}posts/`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            // dispatch(setPosts(res.data.data));
            setPosts(res.data.data);
          });
        toast.success("Post Edited");
      });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="text-center mt-2">
          <h3 className="text-muted ms-auto">{otherUserEmail || "My Posts"}</h3>
        </div>
        <div className="row  mt-3">
          {posts[0]?.userId !== currentUserId ? (
            ""
          ) : (
<div>
                            <button
                              type="button"
                              className="btn btn-success m-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever="@getbootstrap"
                            >
                              Add New Post
                            </button>
                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      New Post
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <form onSubmit={sendNewPost}>
                                      <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label fw-bold text-muted"> Title</label>
                                        <input
                                          type="text"
                                          name="title"
                                          
                                          onChange={handelAddPost}
                                          className="form-control"
                                          id="recipient-name"
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="message-text"
                                          className="col-form-label fw-bold text-muted"
                                        >
                                          Body
                                        </label>
                                        <textarea
                                          className="form-control"
                                          
                                          name="body"
                                          onChange={handelAddPost}
                                          id="message-text"
                                        />
                                      </div>
                                      <div className="modal-footer mt-3">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <input
                                          type="submit"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                        />
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
          )}
          <div className="col-10">
            <div className=" ms-auto row  ">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div
                    className="card col-md-3 col-lg-4 shadow  text-center "
                    key={index}
                  >
                    <div className="card-body ">
                      <h5 className="card-title text-muted">{post.title}</h5>
                      <h6 className="card-subtitle mb-2 ">
                        User ID: {post.userId}
                      </h6>
                      <p className="card-text">{post.body}</p>
                      <h6 className="card-subtitle m-2 text-muted">
                        Post ID : {post.id}
                      </h6>

                      <hr />
                      {currentUserId == post.userId && (
                        <div className="d-flex justify-content-around mt-3">
                          <div>
                            <button
                              type="button"
                              className="btn btn-info"
                              data-bs-toggle="modal"
                              data-bs-target="#editBtn"
                              data-bs-whatever="@getbootstrap"
                              onClick={() => setEditPost(post)}
                            >
                              Edit
                            </button>
                            <div
                              className="modal fade"
                              id="editBtn"
                              tabIndex={-1}
                              aria-labelledby="editBtnLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="editBtnLabel"
                                    >
                                      Edit Post
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <form onSubmit={sendEditedPost}>
                                      <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label fw-bold text-muted"> Title</label>
                                        <input
                                          type="text"
                                          name="title"
                                          value={editPost.title}
                                          onChange={handelEditPost}
                                          className="form-control"
                                          id="recipient-name"
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="message-text"
                                          className="col-form-label fw-bold text-muted"
                                        >
                                          Body
                                        </label>
                                        <textarea
                                          className="form-control"
                                          value={editPost.body}
                                          name="body"
                                          onChange={handelEditPost}
                                          id="message-text"
                                        />
                                      </div>
                                      <div className="modal-footer mt-3">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <input
                                          type="submit"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                        />
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="text-muted">Loading..</h3>
              )}
            </div>
          </div>

          <div
            className="col-2 bg-light py-2  overflow-auto  shadow"
            style={{ height: "150vh" }}
          >
            {users &&
              users.map((user, index) => (
                <div key={index} className="list-group">
                  <button
                    onClick={() => {
                      displayUserPosts(user.id);
                      setOtherUserEmail(user.email);
                    }}
                    className="list-group-item list-group-item-action bg-success fw-bold text-white m-1 h-75"
                    aria-current="true"
                  >
                    {user.email}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
