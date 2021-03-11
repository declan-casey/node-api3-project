const Posts = require('../posts/posts-model')
const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method}, ${req.url}, ${new Date().toISOString()}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{    
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body){
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name){
      res.status(400).json({
        message: "missing required name field"
      })
  } else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body){
    res.status(400).json({
      message: "missing post data"
    })
  } else if(!req.body.user_id || !req.body.text){
    res.status(400).json({
      message: "missing required text or user_id fields"
    })
  } else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};