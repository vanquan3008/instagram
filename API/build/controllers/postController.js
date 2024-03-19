const Post = require('../models/Post.js');
const User = require('../models/User.js');
const postController = {
  //[Post]/create post 
  createPost: async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savePost = await newPost.save();
      res.status(200).json(savePost);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //[GET] /timeline/:userid
  getPostTimeLine: async (req, res) => {
    try {
      const userId_params = req.params.userid;
      const user = await User.findOne({
        _id: userId_params
      });
      // Post User 
      const PostUser = await Post.find({
        userId: userId_params
      });
      //Post Friends
      const PostFriends = await Promise.all(user.followings.map(friend => {
        return Post.find({
          userId: friend._id
        });
      }));
      res.status(200).json(PostUser.concat(...PostFriends));
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //[GET]/timeline/postsuccess/:userid
  getPostSuccess: async (req, res) => {
    try {
      const userId_params = req.params.userid;
      // Get all posts 
      const Posts = await Post.find({});
      //Get Post 
      const user = await User.findOne({
        _id: userId_params
      });
      const PostUser = await Post.find({
        userId: userId_params
      });
      const PostFriends = await Promise.all(user.followings.map(friend => {
        return Post.find({
          userId: friend._id
        });
      }));
      const timelinePosts = PostUser.concat(...PostFriends);
      const Array_new = [];
      Posts.map(element => {
        for (let i = 0; i < timelinePosts.length; i++) {
          if (element.userId === timelinePosts[i].userId) {
            return element;
          }
        }
        Array_new.push(element);
      });
      res.status(200).json(Array_new);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //[PUT]/like/:postid
  likePost: async (req, res) => {
    try {
      const postid = req.params.postid;
      const currentPost = await Post.findOne({
        _id: postid
      });
      console.log(req.body.userId);
      //Dislike
      if (currentPost.like.includes(req.body.userId)) {
        await currentPost.updateOne({
          $pull: {
            like: req.body.userId
          }
        });
        res.status(200).json("The post has been disliked!");
      } else {
        await currentPost.updateOne({
          $push: {
            like: req.body.userId
          }
        });
        res.status(200).json("The post has been liked!");
        console.log(currentPost);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //[Delete]/delete/:postid
  deletePost: async (req, res) => {
    const postId = req.params.postid;
    const post = await Post.findOne({
      _id: postId
    });
    const userPost = req.body.userId;
    try {
      if (post.userId === userPost) {
        await post.deleteOne();
        res.status(200).json(userPost);
      } else {
        res.status(404).json(userPost);
      }
    } catch (err) {
      res.status(500).json(userPost);
    }
  },
  updatePost: async (req, res) => {
    const postId = req.params.postid;
    const post = await Post.findOne({
      _id: postId
    });
    const userPost = req.body.userId;
    try {
      if (userPost === post.userId) {
        await Post.updateOne({
          _id: postId
        }, req.body);
        res.status(200).json("Updated sucessfully");
      } else {
        res.status(404).json("Can not update post other people");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
module.exports = postController;