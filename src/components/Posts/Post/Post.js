import React from "react";
import useStyles from "./postStyles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePostAsync, likePostAsync } from "../../../actions/postActions";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile")); // get the user from local storage

  const Likes = () => {
    const likeLen = post.likes.length;
    if (likeLen > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{" "}
          {likeLen > 2
            ? `You and ${likeLen - 1} others`
            : `${likeLen} like${likeLen > 1 ? "s" : ""} `}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp; {likeLen} {likeLen === 1 ? "Like" : "Likes"}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp; Like
        </>
      );
    }
  };

  return (
    // <h2>{post.tags}</h2>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {user?.result._id === post?.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>

      <CardContent variant="body2" color="textSecondary" component="p">
        <Typography>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePostAsync(post._id))}
          disabled={!user?.result}
        >
          <Likes />
        </Button>

        {user?.result._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePostAsync(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
