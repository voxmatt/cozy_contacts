// USER MODEL

function User(data) {
  this.id = data.id;

  this.email = ko.observable(data.email);
  this.emailLink = ko.computed(function() {
    return "mailto:" + this.email();
  }, this);

  this.firstName = ko.observable(data.first_name);
  this.lastName = ko.observable(data.last_name);
  this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
  }, this);
  this.initials = ko.computed(function(){
    return this.firstName().charAt(0) +  this.lastName().charAt(0);
  }, this);

  this.jobTitle = ko.observable(data.job_title);

  this.picURL = ko.observable(data.pic_url);
  this.twitterName = ko.observable(data.twitter_name);
  this.niceTwitterName = ko.computed(function(){
    return "@" + this.twitterName();
  }, this);
  this.twitterURL = ko.computed(function(){
    return "http://www.twitter.com/" + this.twitterName();
  }, this);
}

// VIEW MODEL

function UserViewModel() {
  var self = this;
  self.users = ko.observableArray([]);
  self.selectedUser = ko.observable();
  self.isUserFormVisible = ko.observable(false);

  self.showUser = function(user) {
    self.selectedUser(user);
  }
  self.hideUser = function(user) {
    self.selectedUser(false);
  }

  self.showUserForm = function() {
    self.isUserFormVisible(true);
  }
  self.hideUserForm = function() {
    self.isUserFormVisible(false);
  }

  self.updateUser = function(form) {
    $.ajax({
      url: '/api/users/' + this.id,
      type: 'put',
      data: $(form).serialize()
    }).done( function(data) {
      self.selectedUser(false);
      self.notify("The user was saved successfully!", "success")
    })
  }

  self.createUser = function(form) {
    $.ajax({
      url: '/api/users',
      type: 'post',
      data: $(form).serialize()
    }).done( function(data) {
      var user = new User(data);
      form.reset();
      self.users.push(user);
      self.notify("The user was created successfully!");
      self.isUserFormVisible(false);
    }).fail( function(data) {
      self.notify("There was a problem creating the user. Please try again.", "error")
    })
  }

  self.deleteUser = function () {
    var user = this;

    $.ajax({
      url: '/api/users/' + this.id,
      type: 'delete',
    }).done( function() {
      self.users.remove(user);
      self.selectedUser(false);
      self.notify("The user was successfully deleted!", "success")
    })
  }

  self.notify = function(message, type) {
    if (type == "error"){
      $(".notifications").addClass("error-message");
    } else{
      $(".notifications").removeClass("error-message");
    }
    $(".notifications p").text(message);
    $(".notifications").slideDown();
    setTimeout(function(){
      $(".notifications").slideUp();
    }, 2500);
  }
  
  $.getJSON("/api/users", function(users) {
    var mappedUsers = $.map(users, function(user) { return new User(user) });
    self.users(mappedUsers);
  });
}


// CUSTOM BINDING FOR TRANSITIONS

ko.bindingHandlers.slideVisible = {
    init: function(element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function(element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.utils.unwrapObservable(value) ? $(element).slideDown() : $(element).slideUp();
    }
};


ko.applyBindings(new UserViewModel());
