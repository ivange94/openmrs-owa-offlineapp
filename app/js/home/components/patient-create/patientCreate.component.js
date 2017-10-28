import template from './patientCreate.html';
import controller from './patientCreate.controller';

let patientCreateComponent = {
    restrict: 'E',
    bindings: {},
    template: template,
    controller: controller,
    controllerAs: 'vm'
};

export default patientCreateComponent;
