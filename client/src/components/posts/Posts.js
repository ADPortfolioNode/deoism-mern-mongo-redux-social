import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";

const Posts = ({ getPosts, posts: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='Large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to the community
      </p>
      {/* {post form} */}
      <div className='my-1'>
        {!posts ? (
          <Spinner />
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post
});

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getPosts })(Posts);
