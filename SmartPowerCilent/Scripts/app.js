var ViewModel = function () {
    var self = this;
    self.activities = ko.observableArray();
    self.user = ko.observableArray();
    self.CurrentActivities = ko.observableArray();
    self.presences = ko.observableArray();
    self.error = ko.observable();
    self.details = ko.observable();

    var ActivitiesURI = 'http://localhost:60854/api/Activity/';

    function getAllActivities() {
        $.ajax({
            type: 'GET',
            url: ActivitiesURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.activities(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }
    getAllActivities();

    var UsersURI = 'http://localhost:60854/api/Users/';

    function getAllUsers() {
        $.ajax({
            type: 'GET',
            url: UsersURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.user(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }


    getAllUsers();

    self.newUser = {
        userId: ko.observable(),
        email: ko.observable(),
        user: ko.observable(),
        password: ko.observable(),
        number: ko.observable()
    };

    self.addUser = function () {
        var addUser = {
            userId: self.newUser.userId(),
            email: self.newUser.email(),
            user: self.newUser.user(),
            password: self.newUser.password(),
            number: self.newUser.number()
        };
        $.ajax({
            type: 'POST',
            url: UsersURL,
            data: JSON.stringify(anAntivity),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.CurrentActivities.push(data);
                alert("User added successfully!");
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });

    };

    self.removeUser = function () {
        var theUser = {
            userId: self.details.userId,
            email: self.details.email,
            user: self.details.user,
            password: self.details.password,
            number: self.details.number
        };
        if (confirm('Are you sure to delete "' + theUser.userid + '"?')) {
            $.ajax({
                type: 'DELETE',
                url: UsersURL + theUser.userId,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    self.activities.remove(theUser);
                    alert("Record has been deleted!");
                },
                error: function (err) {
                    alert("Error: " + err.status + " " + err.statusText);
                }
            });
        }
    };



    var CurrentActivitiesURL = 'http://localhost:60854/api/currentactivities/';

    function getAllCurrentActivities() {
        $.ajax({
            type: 'GET',
            url: CurrentActivitiesURL,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.CurrentActivities(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }
    getAllCurrentActivities();


    var presencesURI = 'http://localhost:60854/api/Presence/';

    function getAllpresences() {
        $.ajax({
            type: 'GET',
            url: presencesURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.presences(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }

    getAllpresences();

    self.getActivityDetails = function (item) {
        $.ajax({
            type: 'GET',
            url: CurrentActivitiesURL + item.CurrentActivityId,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.details(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    };


    self.removeCurrentActivites = function () {
        var theActivity = {
            CurrentActivityId: self.details().CurrentActivityId,
            Lighting: self.details().Lighting,
            Machine: self.details().Machine,
            Alarm: self.details().Alarm,
            Door: self.details().Door,
            Timedate: self.details().Timedate
        };
        if (confirm('Are you sure to delete "' + theActivity.Timedate + '"?')) {
            $.ajax({
                type: 'DELETE',
                url: CurrentActivitiesURL + theActivity.CurrentActivityId,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    self.activities.remove(theActivity);
                    alert("Record has been deleted!");
                },
                error: function (err) {
                    alert("Error: " + err.status + " " + err.statusText);
                }
            });
        }
    };

    self.newActivity = {
        CurrentActivityId: ko.observable(),
        Lighting: ko.observable(),
        Machine: ko.observable(),
        Alarm: ko.observable(),
        Door: ko.observable(),
        Timedate: ko.observable()
    };

    self.addActivites = function () {
        var anActivity = {
            CurrentActivityId: self.newActivity.CurrentActivityId(),
            Lighting: self.newActivity.Lighting(),
            Machine: self.newActivity.Machine(),
            Alarm: self.newActivity.Alarm(),
            Door: self.newActivity.Door(),
            Timedate: self.newActivity.Timedate()
        };
        $.ajax({
            type: 'POST',
            url: CurrentActivitiesURL,
            data: JSON.stringify(anAntivity),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.CurrentActivities.push(data);
                alert("Record created successfully!");
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });

    };

    self.saveActivity = function () {

        var updateActivity = {
            CurrentActivityId: self.details().CurrentActivityId,
            Lighting: self.details().Lighting,
            Machine: self.details().Machine,
            Alarm: self.details().Alarm,
            Door: self.details().Door,
            Timedate: self.details().Timedate
        };
        $.ajax({
            type: 'POST',
            url: CurrentActivitiesURL + updateActivity.CurrentActivityId,
            data: JSON.stringify(updateActivity),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.CurrentActivities.replace(data);
                alert("Record updated successfully!");
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });

    };


};


ko.applyBindings(new ViewModel());