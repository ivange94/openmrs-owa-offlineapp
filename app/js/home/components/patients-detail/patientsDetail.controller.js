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

       vm.menuItems = ["Demographics", "Forms"];

       vm.activeMenu = vm.menuItems[0];

       vm.selectedFormId = '0';

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
    }
}
export default PatientsDetailComponent;