"use client";
import * as React from "react";

import ContactForm from "./components/ContactForm";

export default function Home() {
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-black overflow-hidden">
      {message ? (
        <div className="px-6 py-4">
          <p
            className={`font-medium ${
              message.includes("error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        </div>
      ) : (
        <ContactForm onSubmitMessage={setMessage} />
      )}
    </div>
  );
}
