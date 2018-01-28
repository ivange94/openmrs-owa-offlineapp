import localforage from "localforage";

export default function SyncDashboardController(queue, $http, $window) {
    var vm = this;

    vm.queue = queue;

    const PATIENT_CREATE_FORM = "Patient Registration";

    vm.sync = (request, index) => {
        $http.post(request.url, JSON.stringify(request.data)).then(res => {
            vm.queue.splice(index, 1);
            localforage.setItem('queue', vm.queue);
            if (request.form === PATIENT_CREATE_FORM) {
                $window.location.href = "/openmrs/patientDashboard.form?patientId=" + res.data.uuid;
            } else {
                $window.location.href = "/openmrs/module/htmlformentry/htmlFormEntry.form?encounterId=" + res.data.uuid;
            }
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