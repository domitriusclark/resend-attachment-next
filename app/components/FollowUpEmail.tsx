/* eslint-disable react/no-unescaped-entities */
import {
  Html,
  Head,
  Body,
  Heading,
  Text,
  Container,
} from "@react-email/components";

export function FollowUpEmail({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
        <Container>
          <Heading as="h1">
            Hello {firstName}, how can we help with your travel plans?
          </Heading>
          <Text>We hope you're excited about your upcoming trip!</Text>
          <Text>
            If you have any questions or need any assistance, please don't
            hesitate to reply to this email.
          </Text>
          <Text>We're here to make your travel experience unforgettable.</Text>
          <Text>Best regards,</Text>
          <Text>Your Travel Agency Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
