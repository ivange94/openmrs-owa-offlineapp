class PatientSearchController {
    constructor($http) {
        var vm = this;

        vm.query = "";
        vm.url = "/openmrs/ws/rest/v1/patient?v=full&q=";
        vm.patients = [];
        vm.hide = true;

        vm.search = () => {
            $http.get(vm.url + vm.query)
                .then(function(resonse) {
                    vm.patients = resonse.data.results;
                    if (vm.patients.length > 0) {
                        vm.hide = false;
                    }
                    else {
                        vm.hide = true;
                    }
                });
        }
    }
}

export default PatientSearchController;
