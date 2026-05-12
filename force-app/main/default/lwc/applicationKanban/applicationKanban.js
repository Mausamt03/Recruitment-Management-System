import { LightningElement, wire, track } from 'lwc';
import getApplications from '@salesforce/apex/RecruitmentService.getApplications';
import changeApplicationStatus from '@salesforce/apex/RecruitmentService.changeApplicationStatus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ApplicationKanban extends LightningElement {

    @track applications = [];
    @track statusColumns = [];
    @track isLoading = true;

    draggedId;

    statuses = [
        'Applied',
        'Screening',
        'Interview Scheduled',
        'Interviewed',
        'Selected',
        'Rejected',
        'Offered',
        'Hired'
    ];

    // ----------------------------
    // Load Applications
    // ----------------------------
    @wire(getApplications)
    wiredApps({ error, data }) {
        this.isLoading = false;

        if (data) {
            this.applications = data;
            this.prepareColumns();
        } else if (error) {
            console.error(error);
        }
    }

    // ----------------------------
    // Prepare Kanban Columns
    // ----------------------------
    prepareColumns() {
        this.statusColumns = this.statuses.map(status => {
            return {
                status: status,
                records: this.applications
                    .filter(app => app.Application_Status__c === status)
                    .map(app => {
                        return {
                            ...app,
                            badgeClass: this.getBadgeClass(app.Application_Status__c)
                        };
                    })
            };
        });
    }

    // ----------------------------
    // Badge Styling Logic
    // ----------------------------
    getBadgeClass(status) {
        if (status === 'Selected') return 'slds-theme_success';
        if (status === 'Rejected') return 'slds-theme_error';
        if (status === 'Interview Scheduled') return 'slds-theme_info';
        if (status === 'Screening') return 'slds-theme_warning';
        if (status === 'Hired') return 'slds-theme_success';
        if (status === 'Offered') return 'slds-theme_info';
        return 'slds-theme_inverse';
    }

    // ----------------------------
    // Drag Start
    // ----------------------------
    handleDragStart(event) {
        this.draggedId = event.target.dataset.id;
    }

    // ----------------------------
    // Allow Drop
    // ----------------------------
    handleDragOver(event) {
        event.preventDefault();
    }

    // ----------------------------
    // Handle Drop
    // ----------------------------
    handleDrop(event) {
        const newStatus = event.currentTarget.dataset.status;

        changeApplicationStatus({
            appId: this.draggedId,
            newStatus: newStatus
        })
        .then(() => {
            this.showToast('Success', 'Status Updated', 'success');
            return getApplications();
        })
        .then(result => {
            this.applications = result;
            this.prepareColumns();
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    // ----------------------------
    // Toast Message
    // ----------------------------
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}