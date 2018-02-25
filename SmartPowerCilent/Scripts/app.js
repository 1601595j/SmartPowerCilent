var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();


    

    var ActivitiesURI = 'http://localhost:60854/api/Activity';

    function getAllActivities() {
        $.ajax({
            type: 'GET',
            url: ActivitiesURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.Activities(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }
    getAllActivities();

    var UsersURI = 'http://localhost:60854/api/Users';

    function getAllUsers() {
        $.ajax({
            type: 'GET',
            url: UsersURI,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.Users(data);
            },
            error: function (err) {
                alert("Error: " + err.status + " " + err.statusText);
            }
        });
    }

    getAllUsers();


    var CurrentActivitiesURI = 'http://localhost:60854/api/currentactivities';

    function getAllCurrentActivities() {
        $.ajax({
            type: 'GET',
            url: CurrentActivitiesURI,
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


    var presencesURI = 'http://localhost:60854/api/Presence';

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

    
};

    ko.applyBindings(new ViewModel());