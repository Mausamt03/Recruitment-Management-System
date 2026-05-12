import { LightningElement, wire } from 'lwc';
import getCandidateApplications from '@salesforce/apex/RecruitmentService.getCandidateApplications';

const COLUMNS = [
    { label: 'Job', fieldName: 'Job_Requisition__r.Name' },
    { label: 'Status', fieldName: 'Application_Status__c' },
    { label: 'Applied Date', fieldName: 'Applied_Date__c', type: 'date' }
];

export default class MyApplications extends LightningElement {

    columns = COLUMNS;
    applications;

    @wire(getCandidateApplications, { candidateId: '$recordId' })
    wiredApps({ data }) {
        if (data) {
            this.applications = data;
        }
    }
}