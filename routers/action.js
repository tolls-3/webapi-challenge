const express = require("express");
const router = express.Router();
const { validateAction, validateActionId } = require("../middleware");

const Action = require("../data/helpers/actionModel");

router.use(express.json());

router.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server error: " + error
      });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  Action.get(req.action.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server error: " + error
      });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  Action.update(req.action.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server error:" + error
      });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  Action.remove(req.action.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Internal Server Error: " + error
      });
    });
});

module.exports = router;
