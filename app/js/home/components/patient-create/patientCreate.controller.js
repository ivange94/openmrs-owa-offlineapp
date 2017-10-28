class PatientCreateController {
    /* @ngInject */
    constructor($state) {
        var vm = this;

        vm.next = () => {
            console.log("back button clicked");
            $state.go('findPatient');
        }
    }
}

export default PatientCreateController;
