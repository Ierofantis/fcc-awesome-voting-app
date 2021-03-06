const User = require('../models/user');
const Poll = require('../models/poll').model;

exports.index = (req,
  res) => {
  res.render('index', {
    message: req.flash('message'), user: req.user,
  });
};
//  Authenticate
exports.getLoginPage = (req,
  res) => {
  res.render('login', {
    message: req.flash('message'),
  });
};

exports.authenticate = (req,
  res) => {
  res.sendStatus(501);
};

exports.getRegisterPage = (req,
  res) => {
  res.render('register', {
    message: req.flash('message'),
  });
};

exports.register = (req,
  res) => {
  res.sendStatus(501);
};
//  Create
exports.createPoll = (req,
  res) => {
  const query = { username: req.user.username };
  const poll = new Poll();
  const pollID = poll._id;
  poll.name = 'New poll';
  poll.choices = ['Blue', 'Pink'];
  poll.votes = [50, 50];

  User.findOneAndUpdate(query, { $push: { polls: poll } }, { new: true }, (err,
    user) => {
    if (err) { res.sendStatus(500); } else if (!user) { res.sendStatus(404); } else {
      res.render('poll', { poll: user.polls.id(pollID) });
    }
  });
};

exports.createPollOption = (req,
  res) => {
  res.sendStatus(501);
};

//  Read
exports.getPoll = (req,
  res) => {
  const pollID = req.params.pollID;
  User.findOne({
    'polls._id': pollID,
  }, (err,
    user) => {
    if (err) { res.sendStatus(500); } else if (!user) { res.sendStatus(404); } else {
      res.render('poll', { user: req.user, poll: user.polls.id(pollID) });
    }
  });
};

//  Update
exports.sharePoll = (req,
  res) => {
  res.sendStatus(501);
};

exports.votePoll = (req,
  res) => {
  res.sendStatus(501);
};

//  Delete
exports.deletePoll = (req,
  res) => {
  res.sendStatus(501);
};

exports.deletePollOption = (req,
  res) => {
  res.sendStatus(501);
};
