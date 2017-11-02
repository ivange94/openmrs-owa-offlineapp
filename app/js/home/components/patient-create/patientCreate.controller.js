class PatientCreateController {
    /* @ngInject */
    constructor($state, $http) {
        var vm = this;

        vm.patient = {
            person: {
                names: [{
                    givenName: "",
                    middleName: "",
                    familyName: "",
                }],
                gender: "",
                birthdate: "",
                addresses: [{
                    preferred: true,
                    address1: "",
                    address2: ""
                }]
            },
            identifiers: [{
                identifierType: "",
                identifier: "",
                location: "",
            }]
        };

        vm.created = false;

        vm.identifiers = [];
        vm.locations = [];

        $http.get("/openmrs/ws/rest/v1/patientidentifiertype")
            .then(function(response) {
                vm.identifiers = response.data.results;
            });

        $http.get("/openmrs/ws/rest/v1/location")
            .then(function(response) {
               vm.locations = response.data.results;
            });

        var names = $state.params.personData.name.split(" ");

        if (names.length < 3) {
            vm.patient.person.names[0].givenName = names[0];
            vm.patient.person.names[0].familyName = names[1];
        } else {
            vm.patient.person.names[0].givenName = names[0];
            vm.patient.person.names[0].middleName = names[1];
            vm.patient.person.names[0].familyName = names[2];
        }

        vm.patient.person.gender = $state.params.personData.gender;
        vm.patient.person.birthdate = $state.params.personData.birthdate;

        vm.createPatient = () => {
            $http.post("/openmrs/ws/rest/v1/patient", JSON.stringify(vm.patient))
                .then(function(response) {
                    console.log(response);
                });
        };
    }
}

export default PatientCreateController;
