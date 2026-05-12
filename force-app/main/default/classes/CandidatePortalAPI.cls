@RestResource(urlMapping='/candidateportal/*')
global with sharing class CandidatePortalAPI {

    @HttpGet
    global static List<Job_Requisition__c> getJobs() {
        return [
            SELECT Id, Name, Department__c, Open_Positions__c
            FROM Job_Requisition__c
            WHERE Status__c = 'Approved'
            ORDER BY CreatedDate DESC
        ];
    }

    @HttpPost
    global static String applyForJob() {

        RestRequest req = RestContext.request;
        Map<String, Object> data =
            (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());

        Job_Application__c application = new Job_Application__c(
            Candidate__c = (Id) data.get('candidateId'),
            Job_Requisition__c = (Id) data.get('jobId'),
            Application_Status__c = 'Applied'
        );

        insert application;

        return 'Application Submitted Successfully';
    }
}