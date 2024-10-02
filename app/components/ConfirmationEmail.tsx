/* eslint-disable react/no-unescaped-entities */
import {
  Html,
  Head,
  Body,
  Heading,
  Text,
  Container,
} from "@react-email/components";

export function ConfirmationEmail({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Heading as="h1">Thank you for contacting us, {firstName}!</Heading>
          <Text>
            We've received your inquiry and will get back to you as soon as
            possible.
          </Text>
          <Text>
            In the meantime, feel free to browse our latest travel deals on our
            website.
          </Text>
          <Text>Best regards,</Text>
          <Text>Your Travel Agency Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
