//Add a work helper function to the jQuery object
$.work = function (args) {
    var def = $.Deferred(function (dfd) {
        var worker;
        if (window.Worker) {
            //Construct the Web Worker
            var worker = new Worker(args.file);
            worker.onmessage = function (event) {
                //If the Worker reports success, resolve the Deferred
                dfd.resolve(event.data);
            };
            worker.onerror = function (event) {
                //If the Worker reports an error, reject the Deferred
                dfd.reject(event);
            };
            worker.postMessage(args.args); //Start the worker with supplied args
        } else {
            //Need to do something when the browser doesn't have Web Workers
        }
    });

    //Return the promise object (an "immutable" Deferred object for consumers to use)
    return def.promise();
};

$.work({ file: 'test_worker.js', args: { anArg: "hello!" } }).then(function (data) {
    //Worker completed successfully
    console.log(data);
}).fail(function (data) {
    //Worker threw an error
    console.log(data);
});


var worker1 = $.work({ file: 'primes.js', args: { from: 1, to: 500000 } });
var worker2 = $.work({ file: 'primes.js', args: { from: 500001, to: 1000000 } });

$.when(worker1, worker2).done(function (result1, result2) {
    //All finished! Combine the results from both workers.
});