import { LightningElement, wire, track } from 'lwc';
import getOffers from '@salesforce/apex/RecruitmentService.getOffers';
import updateOfferStatus from '@salesforce/apex/RecruitmentService.updateOfferStatus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OfferDashboard extends LightningElement {

    @track offers = [];
    @track isLoading = true;

    @wire(getOffers)
    wiredOffers({ data, error }) {

        this.isLoading = false;

        if (data) {
            this.offers = data.map(offer => {
                return {
                    ...offer,

                    // SAFE Candidate Name
                    candidateName:
                        offer.Job_Application__r &&
                        offer.Job_Application__r.Candidate__r
                            ? offer.Job_Application__r.Candidate__r.Name
                            : 'No Candidate',

                    badgeClass: this.getBadgeClass(offer.Offer_Status__c),

                    isClosed:
                        offer.Offer_Status__c === 'Accepted' ||
                        offer.Offer_Status__c === 'Rejected'
                };
            });
        } else if (error) {
            console.error(error);
        }
    }

    getBadgeClass(status) {
        if (status === 'Accepted') return 'slds-theme_success';
        if (status === 'Rejected') return 'slds-theme_error';
        if (status === 'Sent') return 'slds-theme_info';
        return 'slds-theme_warning';
    }

    handleAccept(event) {
        const offerId = event.target.dataset.id;
        this.updateStatus(offerId, 'Accepted');
    }

    handleReject(event) {
        const offerId = event.target.dataset.id;
        this.updateStatus(offerId, 'Rejected');
    }

    updateStatus(offerId, status) {

        this.isLoading = true;

        updateOfferStatus({ offerId: offerId, status: status })
            .then(() => {
                this.showToast('Success', 'Offer Updated', 'success');
                return getOffers();
            })
            .then(result => {
                this.offers = result.map(offer => {
                    return {
                        ...offer,
                        candidateName:
                            offer.Job_Application__r &&
                            offer.Job_Application__r.Candidate__r
                                ? offer.Job_Application__r.Candidate__r.Name
                                : 'No Candidate',

                        badgeClass: this.getBadgeClass(offer.Offer_Status__c),

                        isClosed:
                            offer.Offer_Status__c === 'Accepted' ||
                            offer.Offer_Status__c === 'Rejected'
                    };
                });

                this.isLoading = false;
            })
            .catch(error => {
                this.isLoading = false;
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
}