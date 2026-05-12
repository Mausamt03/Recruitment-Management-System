import { LightningElement, wire, track } from 'lwc';
import getApprovedJobs from '@salesforce/apex/RecruitmentService.getApprovedJobs';

export default class JobPortal extends LightningElement {

    @track jobs;
    @track error;
    @track isLoading = true;

    columns = [
        { label: 'Job Title', fieldName: 'Name' },
        { label: 'Department', fieldName: 'Department__c' },
        { label: 'Open Positions', fieldName: 'Open_Positions__c', type: 'number' }
    ];

    @wire(getApprovedJobs)
    wiredJobs({ error, data }) {
        this.isLoading = false;

        if (data) {
            this.jobs = data;
        } else if (error) {
            this.error = error.body.message;
        }
    }
}