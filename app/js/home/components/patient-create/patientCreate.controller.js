import localforage from 'localforage';

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

        vm.serverIsAvailable = false;

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
            checkServerStatus();
            if (vm.serverIsAvailable) {
                $http.post("/openmrs/ws/rest/v1/patient", JSON.stringify(vm.patient))
                    .then(function(response) {
                        $state.go('patients', {patientId: response.data.uuid, patientCreated: true});
                    }).catch(function (err) {
                        console.log("Error: ", err);
                    });
            } else {
                alert("You don't have internet connection. You're data will be saved offline");
                localforage.getItem("queue").then(function(queue) {
                    if (queue === null) {
                        localforage.setItem("queue", []).then(function (queue) {
                            queue.push({url: "/openmrs/ws/rest/v1/patient", data: JSON.stringify(vm.patient)});
                            localforage.setItem("queue", queue);
                        });
                    } else {
                        queue.push({url: "/openmrs/ws/rest/v1/patient", data: JSON.stringify(vm.patient)});
                        localforage.setItem("queue", queue).then(function (queue) {
                            console.log("Queue updated!!!", queue);
                        }).catch(function (err) {
                            console.log("Error updating queue", err);
                        });
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
            }
        };

        var checkServerStatus = function () {
            /**
            var img = document.body.appendChild(document.createElement("img"));
            img.onload = function()
            {
                vm.serverIsAvailable = true;
            };
            img.onerror = function()
            {
                vm.serverIsAvailable = false;
            };
            img.src = document.location.origin + "/openmrs/owa/dist/ping.png?" + Date.now();
             */

            vm.serverIsAvailable = navigator.onLine;
        }


    }
}

export default PatientCreateController;
