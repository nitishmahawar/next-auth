import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  verifyLink?: string;
}

const baseUrl =
  process.env.NODE_ENV == "production"
    ? "https://airachat.com"
    : "http://localhost:3000";

export const VerifyEmail = ({
  verifyLink = "https://airachat.com",
}: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify Your Auth Account</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img
                src={`${baseUrl}/public/logo.png`}
                width="40"
                height="33"
                alt="VivaSynth"
              /> */}
          <Heading as="h1" style={heading}>
            Verify Email
          </Heading>
          <Section>
            <Text style={text}>
              This is the verification email for your Auth account. To verify
              your account please click on button below.
            </Text>
            <Button style={button} href={verifyLink}>
              Verify Email
            </Button>
            <Text style={text}>
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about - you can safely ignore it.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const heading = {
  fontSize: "28px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "700",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
