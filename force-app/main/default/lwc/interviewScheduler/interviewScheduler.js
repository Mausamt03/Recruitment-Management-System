import { LightningElement, track, wire } from 'lwc';
import getApplications from '@salesforce/apex/RecruitmentService.getApplications';
import scheduleInterview from '@salesforce/apex/RecruitmentService.scheduleInterview';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InterviewScheduler extends LightningElement {

    @track selectedApp;
    @track interviewDate;
    @track interviewType;
    @track applicationOptions = [];

    typeOptions = [
        { label: 'Technical', value: 'Technical' },
        { label: 'HR', value: 'HR' },
        { label: 'Managerial', value: 'Managerial' }
    ];

    /* ===============================
       LOAD APPLICATIONS
    =============================== */

    @wire(getApplications)
    wiredApplications({ data, error }) {
        if (data) {
            this.applicationOptions = data.map(app => {
                return {
                    label: app.Candidate__r.Name + ' - ' + app.Job_Requisition__r.Name,
                    value: app.Id
                };
            });
        } else if (error) {
            console.error(error);
        }
    }

    handleAppChange(event) {
        this.selectedApp = event.detail.value;
    }

    handleDateChange(event) {
        this.interviewDate = event.target.value;
    }

    handleTypeChange(event) {
        this.interviewType = event.detail.value;
    }

    /* ===============================
       SCHEDULE INTERVIEW
    =============================== */

    scheduleInterview() {

        if (!this.selectedApp || !this.interviewDate || !this.interviewType) {
            this.showToast('Error', 'Please fill all fields', 'error');
            return;
        }

        scheduleInterview({
            applicationId: this.selectedApp,
            interviewDate: this.interviewDate,
            type: this.interviewType
        })
        .then(() => {
            this.showToast('Success', 'Interview Scheduled Successfully', 'success');

            // Reset form
            this.selectedApp = null;
            this.interviewDate = null;
            this.interviewType = null;
        })
        .catch(error => {
            console.error(error);
            this.showToast('Error', 'Failed to schedule interview', 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}