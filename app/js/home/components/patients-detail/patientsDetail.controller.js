class PatientsDetailComponent {
    constructor($stateParams, $http, dataAccessService) {
       var vm = this;

       console.log(dataAccessService);
       vm.patient = {};
       $http.get("/openmrs/ws/rest/v1/patient/" + $stateParams.patientId)
           .then(function(response) {
              vm.patient = response.data;
           });

       vm.patientCreated = false;

       vm.menuItems = ["Demographics", "Forms"];

       vm.activeMenu = vm.menuItems[0];

       vm.selectedFormId = '0';

       vm.cultureresult = {};

       vm.smearresult = {
           patient: vm.patient.uuid
       };

        vm.hivtestresult = {
            patient: vm.patient.uuid
        };

        vm.hivtbinformation = {};

       vm.cultureresult.patient = vm.patient.uuid;

       vm.locations = [];

       vm.providers = [];

        vm.cultureResultAnswerConcepts = [
            {id: 6, name: "CONTAMINATED"},
            {id: 4, name: "NEGATIVE"},
            {id: 5, name: "POSITIVE"},
            {id: 8, name: "POSITIVE (1+)"},
            {id: 9, name: "POSITIVE (2+)"},
            {id: 7, name: "POSITIVE (3+)"},
            {id: 11, name: "POSITIVE for AFB"},
            {id: 3, name: "SCANTY"},
            {id: 10, name: "MYCOBACTERIUM OTHER THAN TUBERCULOSIS (228)"}
        ];

        vm.smearResultSampleTypes = [
            {id: 22, name: "CEREBROSPINAL FLUID"},
            {id: 19, name: "GASTRIC FLUID/CONTENTS"},
            {id: 23, name: "BRONCHIAL APIRATE"},
            {id: 24, name: "URINE"},
            {id: 20, name: "FECES"},
            {id: 21, name: "PULMONARY TISSUE"},
            {id: 15, name: "SPUTUM"},
            {id: 17, name: "PULMONARY EFFUSION"},
            {id: 16, name: "ARTICULAR FLUID"},
            {id: 18, name: "PERITONEAL FLUID"}
        ];

        vm.tuberculosisSmearResults = [
            {id: 5, name: "POSITIVE"},
            {id: 6, name: "CONTAMINATED"},
            {id: 3, name: "SCANTY"},
            {id: 9, name: "POSITIVE (2+)"},
            {id: 7, name: "POSITIVE (3+)"},
            {id: 8, name: "POSITIVE (1+)"},
            {id: 4, name: "NEGATIVE"},
            {id: 30, name: "UNSATISFACTORY SAMPLE"}
        ];

        vm.smearResultAppearances = [
            {id: 26, name: "SALIVA"},
            {id: 27, name: "BLOODY"},
            {id: 28, name: "MUCOPURULENT"}
        ];

       const CULTURE_RESULT_URL = "/openmrs/ws/rest/v1/cultureresult";

       const CULTURE_RESULT_FORM = "Culture Result Form";

       const SMEAR_RESULT_URL = "/openmrs/ws/rest/v1/smearresult";

       const SMEAR_RESULT_FORM = "Smear Result Form";

       const HIV_TEST_RESULT_URL = "/openmrs/ws/rest/v1/hivtestresult";

       const HIV_TEST_RESULT_FORM = "HIV Test Result Form";

       vm.$onInit = function () {
           $http.get("/openmrs/ws/rest/v1/location").then(res => {
               vm.locations = res.data.results;
           });

           $http.get("/openmrs/ws/rest/v1/provider?v=full").then(res => {
               vm.providers = res.data.results;
           });
       };

       document.getElementById(vm.activeMenu).style.display = "block";

       vm.showTab = (tabName) => {
           // Declare all variables
           var i, tabcontent, tablinks;

           // Get all elements with class="tabcontent" and hide them
           tabcontent = document.getElementsByClassName("tabcontent");
           for (i = 0; i < tabcontent.length; i++) {
               tabcontent[i].style.display = "none";
           }

           // Get all elements with class="tablinks" and remove the class "active"
           tablinks = document.getElementsByClassName("tablinks");
           for (i = 0; i < tablinks.length; i++) {
               tablinks[i].className = tablinks[i].className.replace(" active", "");
           }

           // Show the current tab, and add an "active" class to the button that opened the tab
           document.getElementById(tabName).style.display = "block";
           vm.activeMenu = tabName;

           vm.hivtbinformation.patient = vm.patient.uuid;
       };

        var getSelectedFormId = function() {
            vm.selectedFormId = document.getElementById('htmlForm').value;
        }

        vm.showSelectedForm = () => {
            getSelectedFormId();
            if (vm.selectedFormId != 0) {
                document.getElementById('formSelectMenu').style.display = "none";
                document.getElementById(vm.selectedFormId).style.display = "block";
            }
        };

        vm.cancelFormEntry = () => {
            document.getElementById(vm.selectedFormId).style.display = "none";
            document.getElementById('formSelectMenu').style.display = "block";
        }

        var serverIsAvailable = function () {
            return navigator.onLine;
        };

        vm.saveCultureResult = () => {
            forceSetPatientOnCultureResultObject();
            dataAccessService.create(CULTURE_RESULT_URL, vm.cultureresult, CULTURE_RESULT_FORM, {patientName: getPatientName()});
        }

        vm.saveSmearResult = () => {
            vm.smearresult.patient = vm.patient.uuid;
            dataAccessService.create(SMEAR_RESULT_URL, vm.smearresult, SMEAR_RESULT_FORM, {patientName: getPatientName()});
        }

        vm.saveHivTestResult = () => {
            dataAccessService.create(HIV_TEST_RESULT_URL, vm.hivtestresult, HIV_TEST_RESULT_FORM, {patientName: getPatientName()})
        }

        vm.saveTbHivInformation = () => {
            dataAccessService.create(TB_HIV_INFORMATION_URL, vm.hivtbinformation, TB_HIV_INFORMATION_FORM, {patientName: getPatientName()})
        };

        function forceSetPatientOnCultureResultObject() {
            vm.cultureresult.patient = vm.patient.uuid;
        }

        function getPatientName() {
            return vm.patient.person.preferredName.display;
        }
    }
}
export default PatientsDetailComponent;