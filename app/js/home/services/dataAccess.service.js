import localforage from 'localforage';

export default function dataAccessService($http, $state) {
    var service = {
        create: create
    };
    return service;

    function create(url, data, formName, patientDetails) {
        if (serverIsAvailable()) {
            makePost(url, data);
        } else {
            saveRequestOffline(url, data, formName, patientDetails);
        }
    }

    function serverIsAvailable() {
        return navigator.onLine;
    }

    function makePost(url, data) {
        $http.post(url, JSON.stringify(data)).then(res => {
            return res.data;
        })
    }

    function saveRequestOffline(url, data, formName, patientDetails) {
        alert("You don't have internet connection. You're data will be saved offline");
        localforage.getItem("queue").then(function(queue) {
            if (queue === null) {
                var newQueue = createQueue();
                updateQueue(newQueue, url, data, formName, patientDetails);
            } else {
                updateQueue(queue, url, data, formName, patientDetails);
            }
        }).catch(function (err) {
            console.log(err);
        });

        navigator.serviceWorker.ready.then(function (reg) {
            return reg.sync.register('myOneOffSync');
        }).then( () => {
            console.log("Sync registered");
        }).catch(err => {
            console.log("Error registering sync", err);
        });

        $state.go('sync');
    }

    function createQueue() {
        localforage.setItem('queue', []).then(queue => {
            return queue;
        }).catch(err => {
            console.log("Error creating queue!", err);
        })
    }

    function updateQueue(queue, url, data, formName, patientDetails) {
        queue.push({form: formName, display: patientDetails.patientName, url: url, data: data});
        localforage.setItem("queue", queue).then(function (queue) {
            console.log("Queue updated!!!", queue);
        }).catch(function (err) {
            console.log("Error updating queue", err);
        });;
    }
}