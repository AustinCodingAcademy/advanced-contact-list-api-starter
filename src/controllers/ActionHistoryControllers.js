import ActionHistoryModel from '../model/ActionHistoryModel';

const actionHistoryControllers = {};

actionHistoryControllers.listActionHistory = (request, response, next) => {
  ActionHistoryModel.find({}).exec()
    .then(actions => {
      return response.json(actions);
    })
    .catch(err => {
      return next(`Error ${err}`);
    });
};

actionHistoryControllers.removeActionHistoryItem = (request, response, next) => {
  ActionHistoryModel.findByIdAndRemove(request.params._id).exec()
      .then(action => {
        return response.json(action);
      })
      .catch(err => {
        return next(`Error ${err}`);
      });
};

actionHistoryControllers.createActionHistoryItem = (request, response, next) => {
  const model = new ActionHistoryModel({
    actionMessage: request.body.actionMessage
  });

  model.save()
    .then(action => {
      return response.json(action);
    })
    .catch(err => {
      return next(`Error ${err}`);
    });
};

export default actionHistoryControllers;
