public with sharing class ApplicationTriggerHandler {

    public static void handleAfterUpdate(
        List<Job_Application__c> newList,
        Map<Id, Job_Application__c> oldMap
    ) {

        List<Job_Application__c> selectedApps = new List<Job_Application__c>();

        for (Job_Application__c app : newList) {

            Job_Application__c oldApp = oldMap.get(app.Id);

            if (app.Application_Status__c == 'Selected' &&
                oldApp.Application_Status__c != 'Selected') {

                selectedApps.add(app);
            }
        }

        // Auto create offers
       List<Id> selectedAppIds = new List<Id>();

for (Job_Application__c app : newList) {

    Job_Application__c oldApp = oldMap.get(app.Id);

    if (app.Application_Status__c == 'Selected' &&
        oldApp.Application_Status__c != 'Selected') {

        selectedAppIds.add(app.Id);
    }
}

if (!selectedAppIds.isEmpty()) {
    RecruitmentService.generateOffers(selectedAppIds);
}
    }
}