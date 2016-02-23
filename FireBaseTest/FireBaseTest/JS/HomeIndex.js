
function ConversationNode(text,from,dir)
{
    this.Text = text;
    this.Date = (new Date()).format("dd/MM/yyyy HH:mm");
    this.From = from;
    this.dir = dir;
}

function CreateNodeDiv(node)
{
    var span = $('<div> <span>{0}</span> <label class="label label-info">{1}</label><label class="label label-success">{2}</label></div>'.format(node.Text,node.From, node.Date ));
    span.addClass(node.dir);
    return span;
}

var laftActiveTime = {};

$(function ()
{
    var liatDiv = $(".list");

    var baseUrl = 'https://torrid-heat-9968.firebaseio.com/';
    var myDataRef = new Firebase(baseUrl);
    var conversationList = new Firebase(baseUrl + 'conversations');
    var leftActive = new Firebase(baseUrl + 'leftActive');
    var label = $(".active");


    ////clear all
    conversationList.remove();

    $(".save").click(function ()
    {
        var obj = $(this).closest("div").find(".test");

        // data-dir
        var node = new ConversationNode(obj.val(), obj.attr('data-from'), obj.attr('data-dir'));
        conversationList.push(node);
    });


    conversationList.on("child_added", function (snapshot)
    {
        var obj = snapshot.val();       
        var div = CreateNodeDiv(obj);
        liatDiv.append(div);

        $(".test").val("");
    });

    setInterval(function ()
    {
        var utc = (new Date()).getTime();
        leftActive.set(utc);
    }, 1000);


    setInterval(function ()
    {
        var utc = (new Date()).getTime();
        if (laftActiveTime )
        {
            if ((utc - laftActiveTime)<500)
            {
                label.show();
            }
            else
            {
                label.hide();
            }
        }
    }, 1000);

    leftActive.on("value", function (snapshot)
    {
        laftActiveTime = snapshot.val();
    });
});