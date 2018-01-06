import localforage from "localforage";

class SyncDashboardController {
    /* @ngInject */
    constructor($http) {
        var vm = this;

        localforage.getItem("queue").then((queue) => {
            vm.queue = queue;
            console.log(vm.queue);
        }).catch((err) => {
            console.log(err);
        });

        vm.sync = (request) => {
            console.log("Syncing..., ", request);
            $http.post(request.url, JSON.stringify(request.data)).then(response => {
                console.log(result);
            }).catch(err => {
                console.log("Error syncing.", err);
            });
        }
    }
}

export default SyncDashboardController;