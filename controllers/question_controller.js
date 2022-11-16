const Questions = require("../models/question");
const Options = require("../models/option");
//for creating questions
module.exports.create = function (req, res) {
  Questions.create({ title: req.body.title, vote: false },
    function (err, question) {
      if (err) {
        return res.json(500, {
          message: "Question is not created",
          data: err,
        });
      }
      if (question) {
        return res.json(200, {
          message: "Question Created",
          data: question,
        });
      } else {
        return res.json(400, {
          message: "Question not created",
        });
      }
    }
  );
};

//for deleting a question
module.exports.deleteQuestion = async function (req, res) {
  console.log(req.params.id);
  let question = await Questions.findById(req.params.id).populate('option');

  let flag = 0;
  for (opt of question.option) {
    console.log('opt: ', opt);
    if (opt.votes > 0) {
      flag = 1;
    }
  }

  if (flag == 1) {
    return res.json(500, {
      message: "Question could not be deleted beacuse one of the option has votes"

    });
  }
  Questions.findByIdAndDelete(
    { _id: req.params.id },
    function (err, deletedQuestion) {
      if (err) {
        return res.json(500, {
          message: "Error while deleting question",
          data: err,
        });
      }
      // deleting options of deleted question
      Options.deleteMany({ question: req.params.id });

      return res.json(200, {
        message: "Question Deleted Successfully",
      });


      // deleting options of deleted question
      /*   Options.deleteMany({ question: req.params.id }), function (err, deleteOption) {
          if (err) {
            return res.json(500, {
              message: "Could not delete Option",
              data: err,
            });
          }
          return res.json(200, {
            message: "Options are also deleted",
          });
        });
      }; */


    });
}


//adding option to question
module.exports.addOptions = function (req, res) {
  Questions.findById({ _id: req.params.id }, function (err, question) {
    if (err) {
      return res.json(500, {
        message: "Could not find question",
        data: err,
      });
    }
    if (question) {
      const id = question.option.length + 1;
      Options.create(
        {
          id: question.option.length + 1,
          question: req.params.id,
          text: req.body.text,
          votes: 0
          //link: `http://localhost:8000/option/${this._id}/add_vote`,
        },
        function (err, optionCreated) {
          if (err) {
            return res.json(500, {
              message: "option not created",
              data: err,
            });
          }
          optionCreated.link = `http://localhost:8000/option/${optionCreated._id}/add_vote`;
          optionCreated.save();

          Questions.updateOne(
            { _id: req.params.id },
            {
              $push: { option: [optionCreated._id] },
            },
            function (err, QuestionAndOption) {
              if (err) {
                return res.json(500, {
                  message: "Question not updated",
                  data: err,
                });
              }
              return res.json(200, {
                message: "Question And Option Updated",
              });
            }
          );
          question.save();
        }
      );
    } else {
      return res.json(404, {
        message: "Problem",
        data: err,
      });
    }
  });
};

module.exports.showAllQuestions = async (req, res) => {
  try {
    // finding all the questions and returning
    let question = await Questions.findById(req.params.id).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};
