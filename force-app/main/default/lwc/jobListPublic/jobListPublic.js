import { LightningElement, wire, track } from 'lwc';
import getApprovedJobs from '@salesforce/apex/RecruitmentService.getApprovedJobs';
import applyForJob from '@salesforce/apex/RecruitmentService.applyForJob';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class JobPortal extends LightningElement {

    @track jobs = [];
    @track showForm = false;
    @track formData = {};

    selectedJobId;

    /* ==============================
       LOAD APPROVED JOBS
    ============================== */

    @wire(getApprovedJobs)
    wiredJobs({ error, data }) {
        if (data) {
            console.log('Jobs Loaded:', data);
            this.jobs = data;
        } else if (error) {
            console.error('Error loading jobs:', error);
            this.showToast('Error', 'Failed to load jobs', 'error');
        }
    }

    /* ==============================
       OPEN APPLY FORM
    ============================== */

    openForm(event) {
        this.selectedJobId = event.currentTarget.dataset.id;
        console.log('Selected Job Id:', this.selectedJobId);
        this.showForm = true;
    }

    /* ==============================
       CLOSE FORM
    ============================== */

    closeForm() {
        this.showForm = false;
        this.resetForm();
    }

    /* ==============================
       HANDLE INPUT CHANGE
    ============================== */

    handleChange(event) {
        const field = event.target.dataset.field;
        this.formData[field] = event.target.value;
    }

    /* ==============================
       VALIDATION
    ============================== */

    validateForm() {
        if (!this.formData.name ||
            !this.formData.email ||
            !this.formData.phone) {

            this.showToast(
                'Missing Fields',
                'Please fill all required fields (Name, Email, Phone)',
                'error'
            );
            return false;
        }
        return true;
    }

    /* ==============================
       SUBMIT APPLICATION
    ============================== */

    submitApplication() {

        if (!this.validateForm()) {
            return;
        }

        console.log('Submitting Application:', this.formData);

        applyForJob({
            jobId: this.selectedJobId,
            name: this.formData.name,
            email: this.formData.email,
            phone: this.formData.phone,
            currentCompany: this.formData.company,
            yearsExp: this.formData.exp,
            expectedSalary: this.formData.salary,
            resumeLink: this.formData.resume
        })
        .then(result => {

            console.log('Apex Response:', result);

            this.showToast(
                'Success',
                'Application Submitted Successfully!',
                'success'
            );

            this.showForm = false;
            this.resetForm();

        })
        .catch(error => {

            console.error('Submission Error:', error);

            this.showToast(
                'Error',
                'Failed to submit application. Check guest permissions.',
                'error'
            );
        });
    }

    /* ==============================
       RESET FORM
    ============================== */

    resetForm() {
        this.formData = {};
        const inputs = this.template.querySelectorAll('lightning-input');
        if (inputs) {
            inputs.forEach(input => {
                input.value = null;
            });
        }
    }

    /* ==============================
       TOAST HELPER
    ============================== */

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