/*   

- Focus on the transactional email use case, rather than the marketing use case
- Describe how webhooks work and how they can be useful
- Include the ability to send an attachment
- Utilize new features such as scheduling

Event Scheduling App
Overview
The Event Reminder Application allows users to create events, schedule reminders, and send confirmation emails with attachments (like event tickets or calendars). This app can be useful for personal events, meetings, or any occasion where reminders are beneficial.
Key Features
	1.	User Registration/Login:
	2.	Create Event:
	3.	Send Transactional Emails:	
	4.	Email Scheduling:
	5.	View Events


Travel Agency Inquiry Form
Demo App Idea: Simple Contact Form with Email Notifications
Overview
The Simple Contact Form app allows users to submit inquiries through a contact form. When a user submits the form, the app sends a transactional email to the user confirming receipt of their message. Additionally, the app can schedule a follow-up email to be sent after a specified time (e.g., 24 hours). Users can also attach files (like documents or images) with their inquiries.
Key Features
	1.	Contact Form:
	▪	A simple form that includes:
	◦	Name
	◦	Email
	◦	Message
	◦	File upload (for attachments)
	2.	Transactional Email:
	▪	Send a confirmation email to the user once they submit the form, thanking them for their inquiry and providing a summary of their submission.
	3.	Email Scheduling:
	▪	Schedule a follow-up email to be sent after a set period (e.g., 24 hours) to check if they need further assistance.
	

         

*/

import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <ContactForm />
    </div>
  );
}
