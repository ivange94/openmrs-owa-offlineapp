class PatientsDetailComponent {
    constructor($stateParams, $http, $state) {
       var vm = this;

       vm.patient = {};
       $http.get("/openmrs/ws/rest/v1/patient/" + $stateParams.patientId)
           .then(function(response) {
              console.log(response);
              vm.patient = response.data;
           });

       vm.patientCreated = false;
       console.log($stateParams.patientCreated);
    }
}
export default PatientsDetailComponent;