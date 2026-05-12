import { LightningElement, wire } from 'lwc';
import getOffers from '@salesforce/apex/RecruitmentService.getOffers';
import updateOfferStatus from '@salesforce/apex/RecruitmentService.updateOfferStatus';

export default class MyOffers extends LightningElement {

    offers;

    @wire(getOffers)
    wiredOffers({ data, error }) {
        if (data) {
            this.offers = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleAccept(event) {
        this.updateStatus(event.target.dataset.id, 'Accepted');
    }

    handleReject(event) {
        this.updateStatus(event.target.dataset.id, 'Rejected');
    }

    updateStatus(offerId, status) {
        updateOfferStatus({ offerId: offerId, status: status })
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }
}