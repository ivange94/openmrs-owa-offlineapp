import template from './patientsDetail.html';
import controller from './patientsDetail.controller';

let patientDetailComponent = {
    restrict: 'E',
    bindings: {},
    template: template,
    controller: controller,
    controllerAs: 'vm'
};
export default patientDetailComponent;