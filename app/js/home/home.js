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
import patientsDetailComponent from './components/patients-detail/patientsDetail.component';

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
            template: '<forms-list></forms-list>'
        });

        $stateProvider.state('createPatient', {
            url: '/createPatient',
            template: '<patient-create></patient-create>',
            params: {
                personData: null
            }
        });

        $stateProvider.state('hivTestResults', {
            url: '/hivTestResults',
            template: '<hiv-test-results></hiv-test-results>'
        });

        $stateProvider.state('dstResults', {
           url: '/dstResults',
           template: '<dst-results></dst-results>'
        });

        $stateProvider.state('smearResults', {
            url: '/smearResults',
            template: '<smear-results></smear-results>'
        });

        $stateProvider.state('tbHivInfo', {
            url: '/tbHivInfo',
            template: '<tb-hiv-information></tb-hiv-information>'
        });

        $stateProvider.state('cultureResults', {
           url: '/cultureResults',
           template: '<culture-results></culture-results>',
        });

        $stateProvider.state('patients', {
            url: '/patients/{patientId}',
            template: '<patients-detail></patients-detail>',
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
    .component('cultureResults', cultureResultsComponent)
    .component('patientsDetail', patientsDetailComponent);

export default homeModule;
