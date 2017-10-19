import template from '../patientSearch.html';
import controller from '../controllers/patientSearch.controller';

let patientSearchComponent = {
    restrict: 'E',
    bindings: {},
    template: template,
    controller: controller,
    controllerAs: 'vm'
};

export default patientSearchComponent;
