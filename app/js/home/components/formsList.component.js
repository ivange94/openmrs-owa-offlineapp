import template from '../formsList.html';
import controller from '../controllers/formsList.controller';

let formsListComponent = {
    restrict: 'E',
    bindings: {},
    template: template,
    controller: controller,
    controllerAs: 'vm'
}
export default formsListComponent;