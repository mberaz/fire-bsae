
function ConversationNode(text,from,dir)
{
    this.Text = text;
    this.Date = (new Date()).format("dd/MM/yyyy HH:mm");
    this.From = from;
    this.dir = dir;
}

function CreateNodeDiv(node)
{
    var span = $('<div> <p class="text-p">{0}</p><label class="label label-info">{1}</label><label class="label label-success">{2}</label></div>'.format(node.Text,node.From, node.Date ));
    span.addClass(node.dir);
    return span;
}

var laftActiveTime = {};

$(function ()
{
    var listDiv = $(".list");

    var baseUrl = 'https://torrid-heat-9968.firebaseio.com/';
    var myDataRef = new Firebase(baseUrl);
    var conversationList = new Firebase(baseUrl + 'conversations');
    var activeUser = new Firebase(baseUrl + 'activeUser');
    var label = $(".active");


    ////clear all
    conversationList.remove();

    $(".save").click(function ()
    {
        var obj = $(this).closest("div").find(".test");

        var from=obj.attr('data-from');
        // data-dir
        var node = new ConversationNode(obj.val(), from, obj.attr('data-dir'));
        conversationList.push(node);

        activeUser.set(from);
    });


    conversationList.on("child_added", function (snapshot)
    {
        var obj = snapshot.val();       
        var div = CreateNodeDiv(obj);
        listDiv.append(div);

        $(".test").val("");
    });

    activeUser.on("value", function (snapshot)
    {
        var userName = snapshot.val();

        $(".test").removeClass("green-border");
        $("[data-from='" + userName + "']").addClass("green-border");
    });
});