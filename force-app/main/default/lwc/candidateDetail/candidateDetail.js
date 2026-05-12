import { LightningElement, api, track, wire } from 'lwc';
import getCandidateDetails from '@salesforce/apex/RecruitmentService.getCandidateDetails';
import getCandidateApplications from '@salesforce/apex/RecruitmentService.getCandidateApplications';
import updateCandidate from '@salesforce/apex/RecruitmentService.updateCandidate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CandidateDetail extends LightningElement {

    @api recordId;
    @track candidate;
    @track applications;
    @track isLoading = true;

    columns = [
        { label: 'Application', fieldName: 'Name' },
        { label: 'Job', fieldName: 'jobName' },
        { label: 'Status', fieldName: 'Application_Status__c' },
        { label: 'Applied Date', fieldName: 'Applied_Date__c', type: 'date' }
    ];

    @wire(getCandidateDetails, { candidateId: '$recordId' })
    wiredCandidate({ error, data }) {
        if (data) {
            this.candidate = { ...data };
            this.isLoading = false;
        }
    }

    @wire(getCandidateApplications, { candidateId: '$recordId' })
    wiredApplications({ data }) {
        if (data) {
            this.applications = data.map(row => {
                return {
                    ...row,
                    jobName: row.Job_Requisition__r.Name
                };
            });
        }
    }

    handleChange(event) {
        const field = event.target.dataset.field;
        this.candidate[field] = event.target.value;
    }

    handleSave() {
        updateCandidate({ candidateRecord: this.candidate })
            .then(() => {
                this.showToast('Success', 'Candidate Updated', 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
    handleUploadFinished(event) {
    this.showToast('Success', 'Resume Uploaded Successfully', 'success');
}
}