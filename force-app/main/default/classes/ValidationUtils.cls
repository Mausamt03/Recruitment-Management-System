public class ValidationUtils {

    /*
     * Prevent negative salary
     */
    public static void validateSalary(Offer__c offer) {

        if (offer.Offer_Amount__c != null &&
            offer.Offer_Amount__c < 0) {

            offer.addError('Offer Amount cannot be negative.');
        }
    }

}