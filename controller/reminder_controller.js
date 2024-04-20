let database = require("../database");
let remindersController = {
  list: (req, res) => {
     // verify if the user is logined
    
    res.render("reminder/index", { reminders:   database.cindy.reminders});
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈
    let reminderToUpdate = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToUpdate;
    });
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    console.log(req.body);
    if (req.body.completed == "true") {
      searchResult.completed = true;
    } else {
      searchResult.completed = false;
    }
    
    res.redirect("/reminders");
    

    
  },

  delete: (req, res) => {
    use
    remindertodelete = req.params.id;
    database.cindy.reminders = database.cindy.reminders.filter(function (reminder) {
      return reminder.id != remindertodelete;
    });
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
