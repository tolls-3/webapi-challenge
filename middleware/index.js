const Project = require("../data/helpers/projectModel");
const Action = require("../data/helpers/actionModel");

function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json(null);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Server error: " + error.message
      });
    });
}

function validateProject(req, res, next) {
  if (Object.keys(req.body) == 0) {
    res.status(404).json({ message: "Empty project data." });
  } else if (!req.body.name || !req.body.description) {
    res.status(404).json({ message: "missing required text field" });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  if (Object.keys(req.body) == 0) {
    res.status(404).json({ message: "Empty project data." });
  } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(404).json({ message: "missing required text field" });
  } else {
    next();
  }
}

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json(null);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Server error: " + error.message
      });
    });
}

module.exports = {
  validateProjectId,
  validateProject,
  validateAction,
  validateActionId
};
