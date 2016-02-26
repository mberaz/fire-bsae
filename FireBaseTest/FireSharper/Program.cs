using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FireSharper
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
                        BasePath = "https://torrid-heat-9968.firebaseio.com/"
                    };

                    IFirebaseClient client = new FirebaseClient(config);

                    var todo = new Node
                    {
                        Text = "first test",
                        Date = DateTime.Now.ToString(),
                        From = "michael",
                        dir = "rigth"
                    };

                    PushResponse response = await client.PushAsync("conversations",todo);
                    Console.WriteLine("wrote=" + response.Result.Name);

                    EventStreamResponse eventStreamResponse = await client.OnAsync("conversations",(sender,arguments) =>
                    {
                        System.Console.WriteLine(arguments.Path + " " + arguments.Data);
                    });
                }
                catch(Exception)
                {

                    throw;
                }
            }).Wait();

            Console.ReadLine();
        }
    }
}

public class Node
{
    public string Text { get; set; }
    public string Date { get; set; }
    public string From { get; set; }
    public string dir { get; set; }

}

