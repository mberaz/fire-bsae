$(function () {
    var baseUrl = "https://chattest-fbd4c.firebaseio.com";
    var config = {
        apiKey: "AIzaSyDFPOP75jCJ45rbduLrJZE_bMwBE_zYWoA",
        authDomain: "chattest-fbd4c.firebaseapp.com",
        databaseURL: baseUrl,
        storageBucket: "",
    };
    firebase.initializeApp(config);
    firebase.auth().signInAnonymously();

    var usersListRef = firebase.database().ref('users_list');
    var newUserRef = usersListRef.push();

    var conversationsRef = firebase.database().ref('conversations');
    var newConversationsRef = conversationsRef.push();

    var userIitDone = false;
    var chatIitDone = false;

    var newUserRow = $(".newUserRow");
    var usersList = $(".users");
    var welcomeText = $(".welcomeText");
    var chat = $(".fullChat");

    $(".addUser").click(function () {
        newUserRow.toggle();
        $(this).html($(".newUserRow").is(":visible") ? "Cancel" : "Add User");
    });

    $(".saveUser").click(function () {
        var name = $(".userNaem").val();
        var id = usersList.find("li").length + 1;
        newUserRef.set({ "id": id, "name": name });
        var path = newUserRef.toString();
    });

    $(document).on("click", ".userItem", function () {
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        welcomeText.html("Welcome " + name).attr("data-user-id", id).attr("data-name", name);
    });

    usersListRef.once('value', function (snapshot) {
        //read all of the users on page load
        var val = snapshot.exportVal();
        if (!val) return;

        var i = 0;
        for (var prop in val) {
            var user = val[prop];
            if (i === 0) {
                welcomeText.html("Welcome " + user.name).attr("data-user-id", user.id).attr("data-name", user.name);
                i++;
            }
            usersList.append(createUserLi(user.id, user.name));
        }
        userIitDone = true;
    });

    usersListRef.on('child_added', function (snapshot) {
        if (!userIitDone) return;//get all the new users, as they are added
        var val = snapshot.val();
        usersList.append(createUserLi(val.id, val.name));
        $(".addUser").click();
    });

    function createUserLi(id, name) {
        return "<li class='userItem pointer' data-id='{0}' data-name='{1}'> {2}</li>".format(id, name, name);
    }

    $(".postText").click(function () {
        var text = $(".text").val();
        var name = welcomeText.attr("data-name");
        var date = (new Date()).format("dd/MM/yyyy HH:mm");
        newConversationsRef.set({ text: text, username: name, date: date });
        var path = newConversationsRef.toString();
    });

    conversationsRef.once('value', function (snapshot) {
        //read all of the users on page load
        var val = snapshot.exportVal();
        if (!val) return;

        var i = 0;
        for (var prop in val) {
            var message = val[prop];
            createChatMessage(message.username, message.text, message.date);
        }
        chatIitDone = true;
    });

    conversationsRef.on('child_added', function (snapshot) {
        if (!chatIitDone) return;//get all the new users, as they are added
        var message = snapshot.val();
        createChatMessage(message.username, message.text, message.date);
    });

    function createChatMessage(userName, text, date) {
        chat.append("<div>{0}: {1} [{2}] </div>".format(userName, text, date));
    }

});