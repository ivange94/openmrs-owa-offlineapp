class PatientCreateController {
    /* @ngInject */
    constructor($state) {
        var vm = this;

        vm.back = () => {
            $state.go('findPatient');
        }
    }
}

export default PatientCreateController;
