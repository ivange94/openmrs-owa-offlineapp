class PatientCreateController {
    /* @ngInject */
    constructor() {
        var vm = this;
        vm.person = {
          "name": "",
          "gender": "",
          "age": "",
          "birthdate": ""
        };

        vm.next = () => {
          console.log("Hello World!!!");
        }
    }
}

export default PatientCreateController;
