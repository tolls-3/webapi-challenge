const express = require("express");
const router = express.Router();
const {
  validateProject,
  validateProjectId,
  validateAction
} = require("../middleware");
const Project = require("../data/helpers/projectModel");
const Action = require("../data/helpers/actionModel");

router.use(express.json());

router.get("/", (req, res) => {
  Project.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  Project.get(req.project.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.post("/", validateProject, (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Project.update(req.project.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.project.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.project.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  Action.insert({
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes
  })
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server error: " + error
      });
    });
});

module.exports = router;
