public without sharing class RecruitmentService {

    @AuraEnabled(cacheable=true)
    public static List<Job_Requisition__c> getApprovedJobs() {
        return [
            SELECT Id, Name, Department__c, Open_Positions__c
            FROM Job_Requisition__c
            WHERE Status__c = 'Approved'
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static void updateApplicationStatus(Id appId, String status) {
        Job_Application__c app = [
            SELECT Id, Application_Status__c
            FROM Job_Application__c
            WHERE Id = :appId
            LIMIT 1
        ];
        app.Application_Status__c = status;
        update app;
    }
    @AuraEnabled(cacheable=true)
public static List<Job_Application__c> getApplications() {
    return [
        SELECT Id, Name, Application_Status__c,
               Candidate__r.Name,
               Job_Requisition__r.Name
        FROM Job_Application__c
        ORDER BY CreatedDate DESC
    ];
}

@AuraEnabled
public static void changeApplicationStatus(Id appId, String newStatus) {
    Job_Application__c app = [
        SELECT Id, Application_Status__c
        FROM Job_Application__c
        WHERE Id = :appId
        LIMIT 1
    ];

    app.Application_Status__c = newStatus;
    update app;
}
@AuraEnabled(cacheable=true)
public static Candidate__c getCandidateDetails(Id candidateId) {
    return [
        SELECT Id, Name, Email__c, Phone__c,
               Years_of_Experience__c,
               Current_Company__c,
               Expected_Salary__c,
               Resume_Link__c
        FROM Candidate__c
        WHERE Id = :candidateId
        LIMIT 1
    ];
}

@AuraEnabled(cacheable=true)
public static List<Job_Application__c> getCandidateApplications(Id candidateId) {
    return [
        SELECT Id, Name, Application_Status__c,
               Job_Requisition__r.Name,
               Applied_Date__c
        FROM Job_Application__c
        WHERE Candidate__c = :candidateId
        ORDER BY CreatedDate DESC
    ];
}

@AuraEnabled
public static void updateCandidate(Candidate__c candidateRecord) {
    update candidateRecord;
}
@AuraEnabled
public static void scheduleInterview(Id applicationId, DateTime interviewDate, String type) {
    Interview__c interview = new Interview__c(
        Job_Application__c = applicationId,
        Interview_Date__c = interviewDate,
        Interview_Type__c = type,
        Interview_Status__c = 'Scheduled'
    );
    insert interview;
}
/*
 * Auto-generate Offers in bulk
 */
public static void generateOffers(List<Id> applicationIds) {

    List<Offer__c> offersToInsert = new List<Offer__c>();

    for (Id appId : applicationIds) {
        offersToInsert.add(new Offer__c(
            Job_Application__c = appId,
            Offer_Status__c = 'Draft',
            Offer_Date__c = Date.today()
        ));
    }

    if (!offersToInsert.isEmpty()) {
        insert offersToInsert;
    }
}
@AuraEnabled(cacheable=true)
public static List<Offer__c> getOffers() {
    return [
        SELECT Id, Name, Offer_Amount__c, Offer_Status__c,
               Job_Application__r.Candidate__r.Name
        FROM Offer__c
        ORDER BY CreatedDate DESC
    ];
}

@AuraEnabled
public static void updateOfferStatus(Id offerId, String status) {
    Offer__c offer = [SELECT Id FROM Offer__c WHERE Id = :offerId];
    offer.Offer_Status__c = status;
    update offer;
}

@AuraEnabled
public static void applyJob(Id jobId, Id candidateId) {

    Job_Application__c app = new Job_Application__c();

    app.Job_Requisition__c = jobId;
    app.Candidate__c = candidateId;
    app.Application_Status__c = 'Applied';
    app.Applied_Date__c = Date.today();

    insert app;
}




@AuraEnabled
public static void applyForJob(
    Id jobId,
    String name,
    String email,
    String phone,
    String currentCompany,
    Decimal yearsExp,
    Decimal expectedSalary,
    String resumeLink
) {

    // Check if candidate already exists by Email
    List<Candidate__c> existingCandidates = [
        SELECT Id 
        FROM Candidate__c 
        WHERE Email__c = :email
        LIMIT 1
    ];

    Candidate__c candidate;

    if (!existingCandidates.isEmpty()) {
        candidate = existingCandidates[0];
    } else {
        candidate = new Candidate__c(
            Name = name,
            Email__c = email,
            Phone__c = phone,
            Current_Company__c = currentCompany,
            Years_of_Experience__c = yearsExp,
            Expected_Salary__c = expectedSalary,
            Resume_Link__c = resumeLink
        );
        insert candidate;
    }

    // Create Job Application
    Job_Application__c app = new Job_Application__c(
        Job_Requisition__c = jobId,
        Candidate__c = candidate.Id,
        Application_Status__c = 'Applied',
        Applied_Date__c = Date.today()
    );

    insert app;
}


}
