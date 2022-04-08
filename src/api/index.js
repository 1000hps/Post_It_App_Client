import axios from "axios";

const url = "http://localhost:4000/posts";
const API = axios.create({ baseURL: "https://post-it-mern.herokuapp.com/" });

API.interceptors.request.use((req) => {
  // if there is the 'user' profile in local storage?
  const data = localStorage.getItem("profile");
  const parsedData = JSON.parse(data);
  // console.log(parsedData);

  // if there is, we put the token in the authorization field of req.headers
  if (data) {
    req.headers.authorization = `Bearer ${JSON.parse(data).token}`;
    // console.log(req.headers.authorization);
  }
  return req;
});

// fetch posts
export const fetchPosts = () => API.get("/posts");

// create a new post
export const createPost = (_newPost) => API.post("/posts", _newPost);

// update an existing post
export const updateExistingPost = (id, post) => API.patch(`/posts/${id}`, post);

// delete an existing post
export const deleteExistingPost = (id) => API.delete(`/posts/${id}`);

// like a post: increment the number of likes of that post
export const likeExistingPost = (id) => API.patch(`/posts/${id}/likePost`);

// user sign in
export const userSignIn = (formData) => API.post("/user/signin", formData);

// user sign up
export const userSignUp = (formData) => API.post("/user/signup", formData);
