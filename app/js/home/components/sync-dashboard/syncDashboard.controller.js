import localforage from "localforage";

class SyncDashboardController {
    /* @ngInject */
    constructor($http, $state) {
        var vm = this;

        vm.sync = (request, index) => {
            $http.post(request.url, JSON.stringify(request.data)).then(response => {
                vm.queue.splice(index, 1);
                updateOfflineStorage();
                $state.go('patients', {patientId: response.data.uuid, patientCreated: true});
            }).catch(err => {
                console.log("Error syncing.", err);
            });
        };

        vm.cancel = (index) => {
            vm.queue.splice(index, 1);
            updateOfflineStorage();
        };

        vm.refresh = () => {
            localforage.getItem("queue").then((queue) => {
                vm.queue = queue;
                console.log(vm.queue);
            }).catch((err) => {
                console.log(err);
            });
        };

        vm.refresh();

        var updateOfflineStorage = function() {
            localforage.setItem("queue", vm.queue).then(queue => {
                console.log("Deleted request from queue.", queue);
            }).catch(err => {
                console.log("Error deleting request from queue");
            });
        }
    }
}

export default SyncDashboardController;