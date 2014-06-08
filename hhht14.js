if (Meteor.isClient) {
  // antworten = null;
  // Meteor.startup(function () {
  //   antworten = Antworten.find({}).fetch();
  // })
  Session.set("temp","welcome")
  Questions = {
    1: "do you life in Hamburg?",
    2: "are you from germany Deutschland?",
    3: "did you liked the hackathon?",
    4: "will you attend to another hackathon?",
    5: "do you meet nice people?"
  }
  questionCounter = 0;
  var nextQuestion = function() {
    questionCounter += 1;
    if (questionCounter === 6) {
      Session.set("temp","danke");
      return true;
    };
    Session.set("question",Questions[questionCounter]);
  }
  Meteor.startup(function() {
    if (Antworten.find().count() === 0) {
      $.each(Questions, function(key, value){
          Antworten.insert({"question":Questions[key],"ja": 0, "nein": 0});
      });
     };
  });
  Template.layout.temp = function () {
    return Template[Session.get("temp")];
  }
  Template.layout.antworten = function() {
      return Antworten.find({}).fetch();
  }
  Template.firstWeiter.events({
    'click': function() {
      nextQuestion();
      Session.set("Benutzer",document.querySelectorAll(".nameText")[0].value)
      Session.set("temp","questions");
    }
  })
  
  Template.questions.question = function() {
    return Session.get("question");
  }
  Template.questions.benutzer = function() {
    return Session.get("Benutzer");
  }
  Template.buttons.events({
    'click .ja': function() {
      event.preventDefault();
      Antworten.update(Antworten.find({"question": Session.get("question")}).fetch()[0]["_id"],{$inc: {ja: 1}})
      console.log(Antworten.find({"question": Session.get("question")}).fetch()[0]["ja"]);
      nextQuestion();
    },
    'click .nein': function(event) {
      event.preventDefault();
      Antworten.update(Antworten.find({"question": Session.get("question")}).fetch()[0]["_id"],{$inc: {nein: 1}})
      console.log(Antworten.find({"question": Session.get("question")}).fetch()[0]["nein"]);
      nextQuestion();
    }

  })

  Template.stati.antworten = function() {
    return Antworten.find({});
  }

  Template.stati.rendered = function() {
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
