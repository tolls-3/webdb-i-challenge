const express = require("express");
const router = express.Router();

const db = require("./accountsDb");

router.use(express.json());

router.get("/", (req, res) => {
  db.get()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Server error" + error });
    });
});

router.get("/:id", validateAccountId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(account => {
      console.log(account);
      res.status(201).json(account);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Server error" + error });
    });
});

router.post("/", validateAccount, (req,res)=>{
    
})

module.exports = router;

// custom middleware

function validateAccountId(req, res, next) {
  db.getById(req.params.id)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({ message: "invalid account id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Server error: " + error.message
      });
    });
}

function validateAccount(req, res, next) {
    if (Object.keys(req.body) == 0) {
      res.status(404).json({ message: "Empty Account data." });
    } else if (!req.body.name || !req.body.budget) {
      res.status(404).json({ message: "missing required text field" });
    } else {
      next();
    }
  }