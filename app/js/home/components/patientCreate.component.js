import template from '../patientCreate.html';
import controller from '../controllers/patientCreate.controller';

let patientCreateComponent = {
    restrict: 'E',
    bindings: {},
    template: template,
    controller: controller,
    controllerAs: 'vm'
};

export default patientCreateComponent;
