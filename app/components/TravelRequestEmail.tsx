import {
  Html,
  Head,
  Body,
  Heading,
  Text,
  Container,
} from "@react-email/components";

export function TravelRequestEmail({
  firstName,
  lastName,
  email,
  phone,
  message,
  startDate,
  endDate,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  startDate: string;
  endDate: string;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading as="h1">
            {firstName} {lastName} has reached out to book travel!
          </Heading>
          <Text>
            From {formattedStartDate} to {formattedEndDate}
          </Text>
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Text>Message: {message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
