import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headerComponent from './components/header/header.component.js';
import patientSearchComponent from './components/patient-search/patientSearch.component.js';
import patientCreateComponent from './components/patient-create/patientCreate.component.js';
import personCreateComponent from './components/person-create/personCreate.component.js';
import formsListComponent from './components/forms-list/formsList.component';
import hivTestResultsComponent from './components/hiv-test-results/hivTestResults.component';
import dstResultsComponent from './components/dst-results/dstResults.component';
import smearResultsComponent from './components/smear-results/smearResults.component';
import tbHivInformationComponent from './components/tb-hiv-information/tbHivInformation.component';
import cultureResultsComponent from "./components/culture-results/cultureResults.component";

let homeModule = angular.module('home', [ uiRouter])
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            template: require('./home.html')
        });

        $stateProvider.state('findPatient', {
          url: '/findPatient',
          template: require('./home.html')
        });

        $stateProvider.state('listForms', {
            url: '/formsList',
            template: require('./components/forms-list/formsList.html')
        });

        $stateProvider.state('createPatient', {
            url: '/createPatient',
            template: require('./components/patient-create/patientCreate.html')
        });

        $stateProvider.state('hivTestResults', {
            url: '/hivTestResults',
            template: require('./components/hiv-test-results/hivTestResults.html')
        });

        $stateProvider.state('dstResults', {
           url: '/dstResults',
           template: require('./components/dst-results/dstResults.html')
        });

        $stateProvider.state('smearResults', {
            url: '/smearResults',
            template: require('./components/smear-results/smearResults.html')
        });

        $stateProvider.state('tbHivInfo', {
            url: '/tbHivInfo',
            template: require('./components/tb-hiv-information/tbHivInformation.html')
        });

        $stateProvider.state('cultureResults', {
           url: '/cultureResults',
           template: require('./components/culture-results/cultureResults.html'),
        });
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
    .component('personCreate', personCreateComponent)
    .component('formsList', formsListComponent)
    .component('hivTestResults', hivTestResultsComponent)
    .component('smearResults', smearResultsComponent)
    .component('dstResults', dstResultsComponent)
    .component('tbHivInfo', tbHivInformationComponent)
    .component('cultureResults', cultureResultsComponent);

export default homeModule;
