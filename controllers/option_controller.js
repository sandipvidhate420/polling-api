const Questions = require("../models/question");
const Options = require("../models/option");
//function to add vote to option
module.exports.addVote = function (req, res) {
  Options.findById({ _id: req.params.id }, function (err, option) {
    if (err) {
      return res.json(500, {
        message: "Error in finding message",
        data: err,
      });
    }

    if (option) {
      const currentvote = option.votes + 1;
      console.log("currentvote", option.votes);
      Options.updateOne(
        { _id: req.params.id },
        { votes: currentvote },
        function (err, updatedVotes) {
          if (err) {
            return res.json(500, {
              message: "Votes not updated",
              data: err,
            });
          }
          return res.json(200, {
            message: "Option votes updated",
          });
        }
      );
      option.save();
    }
  });
};
//for deleting an option
module.exports.deleteOption = async function (req, res) {
  try {
    let option = await Options.findById({ _id: req.params.id });
    if (!option) {
      return res.json(500, {
        message: "option not found"
      });
    }
    //option has votes
    if (option.votes > 0) {
      return res.json(500, {
        message: `option can't delete because it has ${option.votes} votes`
      });
    }
    //option does not have votes
    await Options.findByIdAndDelete({ _id: req.params.id });
    return res.json(200, {
      message: "Option deleted Successfully",
    });

  }

  catch (err) {
    return res.json(500, {
      message: "Internal server error :" + err

    });
  }
};
