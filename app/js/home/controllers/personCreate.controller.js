class PersonCreateController {
    /* @ngInject */
    constructor($state) {
        var vm = this;
        vm.person = {
          "name": "",
          "gender": "",
          "age": "",
          "birthdate": ""
        };

        vm.next = () => {
          $state.go('createPatient');
        }
    }
}

export default PersonCreateController;
