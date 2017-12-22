importScripts("localforage.min.js");

self.addEventListener('sync', function (event) {
    if (event.tag === 'myOneOffSync') {
        event.waitUntil(
            localforage.getItem("queue").then((queue) => {
                return Promise.all(queue.map(function (request) {
                    console.log(request.data);
                    return fetch(request.url, {
                        method: 'POST',
                        body: JSON.stringify(request.data),
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((data) => {
                        console.log(data);
                        if (data.result === 'success') {
                            console.log("Delete successful request from queue");
                        }
                    })
                })).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        );
    }
});