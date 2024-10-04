"use server";

import { Resend } from "resend";
import { ConfirmationEmail } from "@/app/components/ConfirmationEmail";
import { FollowUpEmail } from "@/app/components/FollowUpEmail";
import { TravelRequestEmail } from "@/app/components/TravelRequestEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleContactFormSubmission(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const attachment = formData.get("fileBase64") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  // const emailConsent = formData.get("emailConsent") === "on";

  try {
    // Send an email to the travel agency for the new request
    await resend.emails.send({
      from: "Travel Agency <noreply@domitrius.dev>",
      to: "domitriusaclark@gmail.com",
      subject: "New travel request",
      react: TravelRequestEmail({
        firstName,
        lastName,
        email,
        phone,
        message,
        startDate,
        endDate,
      }),
      attachments: [
        {
          content: attachment,
          filename: "attachment.png",
          contentType: "image/png",
        },
      ],
    });

    // Send a confirmation email to the client
    await resend.emails.send({
      from: "Travel Agency <noreply@domitrius.dev>",
      to: email,
      subject: "Thank you for contacting us!",
      react: ConfirmationEmail({ firstName }),
    });

    // Send a follow-up email to the client in one day
    await resend.emails.send({
      from: "Travel Agency <travelwithus@domitrius.dev>",
      to: email,
      subject: "Follow-up on your travel inquiry",
      react: FollowUpEmail({ firstName }),
      scheduledAt: "24 hours later",
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again.",
    };
  }
}
