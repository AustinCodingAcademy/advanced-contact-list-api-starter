import ActionModel from '../models/ActionModel';

const ActionController = {};

ActionController.list = (request, response, next) => {
  ActionModel.find({}).exec()
    .then(actions => {
      return response.json(actions);
    })
    .catch(err => {
      next('Error getting action list: ' + err);
    });
};

ActionController.create = (request, response, next) => {
  const model = new ActionModel({
    actionMessage: request.body.actionMessage
  });

  // save the new action
  model.save()
    // When the save completes, return newly created action
    .then(action => {
      return response.json(action);
    })
    .catch(err => {
      next('Error adding action: ' + err);
    });
};

ActionController.remove = (request, response, next) => {
  ActionModel.findByIdAndRemove(request.params._id).exec()
    .then(action => {
      return response.json(action);
    })
    .catch(err => {
      next('Error deleting action: ' + err);
    });
};

export default ActionController;
