"use client";

import { useState } from "react";
import { handleContactFormSubmission } from "@/app/actions/contactFormAction";

export default function ContactForm({
  onSubmitMessage,
}: {
  onSubmitMessage: (message: string) => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    emailConsent: false,
    attachment: "",
    startDate: "",
    endDate: "",
  });

  const [fileBase64, setFileBase64] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        setFileBase64(base64);
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "fileBase64";
        hiddenInput.value = base64;
        event.target.form?.appendChild(hiddenInput);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value as string);
    });

    if (fileBase64) {
      form.append("fileBase64", fileBase64);
    }

    const result = await handleContactFormSubmission(form);

    if (result.success) {
      onSubmitMessage(result.message);
    } else {
      onSubmitMessage(result.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-2xl text-black overflow-hidden">
      <div className="border-gray-200 bg-gray-50 px-6 py-4 border-b">
        <h2 className="font-bold text-2xl text-gray-800">Contact Us</h2>
        <p className="mt-1 text-gray-600 text-sm">
          Get in touch with our travel experts
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4">
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
              value={formData.firstName}
              onChange={handleChange}
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
              value={formData.lastName}
              onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="block mb-1 font-medium text-gray-700 text-sm"
            >
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block mb-1 font-medium text-gray-700 text-sm"
            >
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              value={formData.endDate}
              onChange={handleChange}
              className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
            />
          </div>
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
            value={formData.message}
            onChange={handleChange}
            className="border-gray-300 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="file"
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            Attachment
          </label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="flex items-center">
          <input
            id="emailConsent"
            name="emailConsent"
            type="checkbox"
            checked={formData.emailConsent}
            onChange={handleChange}
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
