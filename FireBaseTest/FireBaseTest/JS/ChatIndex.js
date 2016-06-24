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

    var newUserRow = $(".newUserRow");
    var usersList = $(".users");
    var welcomeText = $(".welcomeText");

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

    $(document).on("click",".userItem", function () {
        var id = $(this).attr("data-id");
        welcomeText.html("Welcome " + $(this).html()).attr("data-user-id", id);
    });


    var initDone = false;

    usersListRef.once('value', function (snapshot) {
        var val = snapshot.exportVal();
        if (!val) return;
        
        var i = 0;
        for (var prop in val) {
            var user = val[prop];
            if(i===0)
            {
                welcomeText.html("Welcome "+user.name).attr("data-user-id", user.id);
                i++;
            }
            usersList.append(createUserLi(user.id, user.name));
        }
        initDone = true;
    });

    usersListRef.on('child_added', function (snapshot) {
        if (!initDone) return;
        var val = snapshot.val();
        usersList.append(createUserLi(val.id, val.name));
    });

    function createUserLi(id, name)
    {
        return "<li class='userItem pointer' data-id='{0}'> {1}</li>".format(id, name);
    }
});