trigger TRG_JobApplication on Job_Application__c (after update) {

    if (Trigger.isAfter && Trigger.isUpdate) {
        ApplicationTriggerHandler.handleAfterUpdate(Trigger.new, Trigger.oldMap);
    }
}