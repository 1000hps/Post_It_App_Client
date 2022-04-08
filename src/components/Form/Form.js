import React, { useState, useEffect } from "react";
import useStyles from "./formStyles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync, updatePostAsync } from "../../actions/postActions";

// When we update a post, we need its id (get the current id of the post)

function Form({ currentId, setCurrentId }) {
  // Component state: the whole form input
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  // If we have currentId, we have a post to edit: find it from redux state, otherwise it is null
  const postToEdit = useSelector((state) =>
    currentId
      ? state.posts.currPosts.find((item) => item._id === currentId)
      : null
  );

  // If there is a post to edit, we populate its content using setPostData
  useEffect(() => {
    if (postToEdit) {
      setPostData(postToEdit);
    }
  }, [postToEdit]);

  const clearForm = () => {
    // To clear the form, we set current id to null and set all form inputs to defaul
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  // when submitting the form, we dispatch the createPost thunk action
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      // if there is a currentId, we dispatch the update action
      dispatch(
        updatePostAsync(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      // otherwise, we dispatch the create post action
      dispatch(createPostAsync({ ...postData, name: user?.result?.name }));
    }
    // clear form
    clearForm();
  };

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // If there is no logged in user, we show that user has to sign in to create post
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like others' posts
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} a Post
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
