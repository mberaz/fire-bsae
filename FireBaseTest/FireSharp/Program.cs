using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using System;
using System.Threading.Tasks;

namespace FireSharpTest
{
    class Program
    {
        static void Main (string[] args)
        {
            Task.Run(async () =>
            {
                try
                {
                    IFirebaseConfig config = new FirebaseConfig
                    {
                        //AuthSecret = "your_firebase_secret",
                        BasePath = "https://torrid-heat-9968.firebaseio.com/conversations"
                    };

                    IFirebaseClient client = new FirebaseClient(config);

                    var todo = new Node
                    {
                        Text = "first test",
                        Date = DateTime.Now.ToString(),
                        From = "michael",
                        dir = "rigth"
                    };

                    PushResponse response = await client.PushAsync("todos/push",todo);
                    Console.WriteLine("wrote=" + response.Result.Name);

                    EventStreamResponse eventStreamResponse = await client.OnAsync("chat",(sender,arguments) =>
                   {
                       System.Console.WriteLine(arguments.Data);
                   });
                }
                catch(Exception)
                {

                    throw;
                }
            }).Wait();
        }
    }


    public class Node
    {
        public string Text { get; set; }
        public string Date { get; set; }
        public string From { get; set; }
        public string dir { get; set; }

    }
}
