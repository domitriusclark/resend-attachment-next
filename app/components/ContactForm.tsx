import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { ConfirmationEmail } from "./ConfirmationEmail";
import { FollowUpEmail } from "./FollowUpEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

async function submitForm(formData: FormData) {
  "use server";

  // Process the form data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const file = formData.get("file") as File;
  const emailConsent = formData.get("emailConsent") === "on";

  // Here you would typically save the data to a database
  // and handle file upload to a storage service
  console.log("Form submitted:", {
    firstName,
    lastName,
    email,
    phone,
    message,
    file,
    emailConsent,
  });

  // Send confirmation email
  try {
    await resend.emails.send({
      from: "Travel Agency <noreply@youragency.com>",
      to: email,
      subject: "Thank you for contacting us!",
      react: ConfirmationEmail({ firstName }),
    });

    // Schedule follow-up email for 24 hours later
    const twentyFourHoursLater = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();
    await resend.emails.send({
      from: "Travel Agency <noreply@youragency.com>",
      to: email,
      subject: "Follow-up on your travel inquiry",
      react: FollowUpEmail({ firstName }),
      scheduledAt: twentyFourHoursLater,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }

  // Revalidate the current page to show a success message
  revalidatePath("/");
}

export default function ContactForm() {
  return (
    <div className="bg-white shadow-md mx-auto rounded-lg w-full max-w-2xl overflow-hidden">
      <div className="border-gray-200 bg-gray-50 px-6 py-4 border-b">
        <h2 className="font-bold text-2xl text-gray-800">Contact Us</h2>
        <p className="mt-1 text-gray-600 text-sm">
          Get in touch with our travel experts
        </p>
      </div>
      <form action={submitForm} className="space-y-4 px-6 py-4">
        <div className="gap-4 grid grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 font-medium text-gray-700 text-sm"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              required
              className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-1 font-medium text-gray-700 text-sm"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              required
              className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            required
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your travel plans..."
            required
            rows={4}
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="file"
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            Attach a File (optional)
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <input
            id="emailConsent"
            name="emailConsent"
            type="checkbox"
            className="border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
          />
          <label
            htmlFor="emailConsent"
            className="block ml-2 text-gray-700 text-sm"
          >
            I agree to receive emails from this site
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-white focus:outline-none transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
