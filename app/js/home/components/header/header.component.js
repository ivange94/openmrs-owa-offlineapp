import template from './header.html';
import controller from './header.controller.js';

let headerComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default headerComponent;
