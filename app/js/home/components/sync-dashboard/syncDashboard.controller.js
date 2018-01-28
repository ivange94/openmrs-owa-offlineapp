import localforage from "localforage";

export default function SyncDashboardController(queue, $http) {
    var vm = this;

    vm.queue = queue;

    vm.sync = (request, index) => {
        $http.post(request.url, JSON.stringify(request.data)).then(res => {
            vm.queue.splice(index, 1);
            localforage.setItem('queue', vm.queue);
            console.log(vm.queue);
        })
    }

    vm.cancel = (index) => {
        vm.queue.splice(index, 1);
        localforage.setItem('queue', vm.queue);
    }

}

SyncDashboardController.resolve = {
    queue: function ($q) {
        var deferred = $q.defer();
        localforage.getItem('queue').then(res => {
            deferred.resolve(res)
        }).catch(err => {
            console.log(err);
            deferred.reject();
        });
        return deferred.promise
    }
}