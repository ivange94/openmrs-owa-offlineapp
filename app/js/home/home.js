import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headerComponent from './components/header.component.js';
import patientSearchComponent from './components/patientSearch.component.js';
import patientCreateComponent from './components/patientCreate.component.js';
import personCreateComponent from './components/personCreate.component.js';

let homeModule = angular.module('home', [ uiRouter])
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            template: require('./home.html')
        });

        $stateProvider.state('createPatient', {
          url: '/',
          template: require('./patientCreate.html')
        })
    })
    .config(['$qProvider', function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }])

    // To prevent adding Hash bangs(#!/) instead of simple hash(#/) in Angular >1.5

    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('');
    }])

    .component('headerComponent', headerComponent)
    .component('patientSearch', patientSearchComponent)
    .component('patientCreate', patientCreateComponent)
    .component('personCreate', personCreateComponent);

export default homeModule;
