Recruitment Management System

A comprehensive Recruitment Management System built on the Salesforce Platform
 using Apex, Lightning Web Components (LWC), SOQL, Triggers, and declarative Salesforce features. The application streamlines the complete hiring lifecycle—from creating job openings to managing applications, scheduling interviews, and issuing final offers.

📌 Project Overview

The Recruitment Management System helps organizations manage their hiring process efficiently within Salesforce. It centralizes all recruitment activities in one application and automates repetitive tasks such as status updates, interview scheduling, and candidate communications.

The system enables recruiters and hiring managers to:

Create and manage job openings
Track candidate applications
Schedule interviews
Record interviewer feedback
Update application statuses
Generate offers
Send automated notifications
Monitor recruitment analytics

🚀 Key Features
👥 Candidate Management
Store candidate personal and professional details
Upload and manage resumes and supporting documents
Maintain candidate profiles and application history

💼 Job Opening Management
Create job requisitions with role details, skills, and experience requirements
Track job status (Open, Closed, On Hold)
Monitor number of applicants per position

📄 Application Tracking
Candidates can apply to multiple positions
Track each application independently
Maintain application stages:
Applied
Screening
Interview Scheduled
Technical Round
HR Round
Offered
Hired
Rejected

📅 Interview Scheduling
Schedule interviews with date, time, and interviewer details
Support multiple interview rounds
Capture interview feedback and ratings
⚙️ Automation with Apex & Triggers
Automatic status updates
Business rule validations
Offer creation logic
Email notifications

📊 Interactive LWC Dashboard
Real-time recruitment pipeline view
Candidate and job summaries
Responsive and modern user interface

📈 Reports and Analytics
Open positions
Stage-wise candidate counts
Hiring conversion metrics

🛠️ Technology Stack
Layer	Technology
Platform	Salesforce Platform

Backend	Apex
Frontend	Lightning Web Components (LWC)
Query Language	SOQL
Automation	Triggers, Validation Rules, Flows
Testing	Apex Test Classes, Jest (optional)
Development Tools	Visual Studio Code
, Salesforce CLI

Version Control	Git
 & GitHub
 
🏗️ Project Architecture
Recruitment Management System
│
├── Custom Objects
│   ├── Job Opening
│   ├── Candidate
│   ├── Application
│   ├── Interview
│   └── Offer
│
├── Apex Classes
│   ├── Controllers
│   ├── Service Classes
│   └── Utility Classes
│
├── Apex Triggers
│   └── Automation and Validation Logic
│
├── Lightning Web Components
│   ├── Dashboard
│   ├── Candidate Tracker
│   ├── Interview Scheduler
│   └── Job Management UI
│
└── Reports & Dashboards

🔄 Recruitment Workflow
Recruiter creates a Job Opening.
Candidate submits an application.
Application enters screening.
Interviews are scheduled.
Feedback is recorded.
Candidate status is updated.
Offer is generated for selected candidates.
Candidate is marked as Hired.

📁 Project Structure
force-app/
└── main/
    └── default/
        ├── classes/
        ├── triggers/
        ├── lwc/
        ├── objects/
        ├── flows/
        ├── permissionsets/
        └── applications/
        
⚙️ Installation & Deployment
Prerequisites
Salesforce CLI
Visual Studio Code
Salesforce Extension Pack
Git
Clone the Repository
git clone https://github.com/yourusername/recruitment-management-system.git
cd recruitment-management-system
Authorize Your Org
sf org login web --alias DevOrg
Deploy to Salesforce
sf project deploy start
Run Tests
sf apex run test --result-format human
🧪 Testing

The project includes:

Apex Test Classes with strong code coverage
Trigger testing
Business logic validation
Optional Jest tests for Lightning Web Components
📸 Suggested Screenshots

This project demonstrates:

Salesforce data modeling
Apex programming
Trigger frameworks
LWC development
SOQL optimization
Test-driven development
Git and GitHub workflow
📌 Resume Description

👨‍💻 Author

Mausam Tripathi
Computer Science & Engineering Student
Salesforce Developer | Full Stack Developer | AI Enthusiast

📄 License

This project is licensed under the MIT License.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
