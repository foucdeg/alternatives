module.exports.userPostVote = {
  username: {
    notEmpty: true
  },
  option: {
    notEmpty: true
  },
  vote: {
    notEmpty: true,
    isIn: {
      options: ['yes', 'no', 'maybe']
    }
  }
};
