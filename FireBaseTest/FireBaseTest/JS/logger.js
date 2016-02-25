

self.addEventListener('message', function (e) {

    if (self.fetch) {
        fetch("/Home/Log", {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ text: e.data.Text, date: e.data.Date, from: e.data.From })
        }).then(function (response) {
            return response.json();
        }).then(function (res) {
            self.postMessage(res);
        }).catch(function (ex) {
            self.postMessage("Error");
        });
          
    } else {
        // do something with XMLHttpRequest?
    }
}, false);

