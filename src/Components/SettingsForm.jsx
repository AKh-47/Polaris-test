import React, { useState } from "react";
import {
  Layout,
  AccountConnection,
  Link,
  Card,
  Checkbox,
  Select,
  Stack,
  TextField,
  FormLayout,
  VisuallyHidden,
  Heading,
  ChoiceList,
  PageActions,
} from "@shopify/polaris";

import avatar from "../assets/avatar-placeholder.png";

export default function SettingsForm() {
  const [connected, setConnected] = useState(false);

  const [autoPublish, setAutoPublish] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [pricingRuleMethod, setPricingRuleMethod] = useState("Fixed markup");
  const [pricingModifier, setPricingModifier] = useState("");
  const [reportingEmailFrequency, setReportingEmailFrequency] = useState([
    "Monthly",
  ]);
  const [trackingUrl, setTrackingUrl] = useState("");

  const accountConnectionMarkup = connected ? (
    <AccountConnection
      action={{
        content: "Disconnect",
        onAction: () => setConnected(false),
      }}
      details="avatar.myshopify.com"
      connected={connected}
      avatarUrl={avatar}
      accountName="Avatar"
    />
  ) : (
    <AccountConnection
      title="Dropshipp"
      action={{
        content: "Connect",
        onAction: () => setConnected(true),
      }}
      details="No account connected"
      connected={connected}
      termsOfService={
        <p>
          By clicking <strong>Connect</strong>, you agree to accept Sample App’s{" "}
          <Link url="Example App">terms and conditions</Link>. You’ll pay a
          commission rate of 15% on sales made through Sample App.
        </p>
      }
    />
  );

  const pricingRuleInput = (
    <Select
      label="Pricing rule method"
      labelHidden
      options={["Multiplier", "Fixed markup"]}
      value={pricingRuleMethod}
      onChange={(value) => setPricingRuleMethod(value)}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    //SUBMIT LOGIC
  };

  return (
    <form onSubmit={handleSubmit}>
      <Layout>
        <Layout.AnnotatedSection
          title="Connected User"
          description="Connect your Shopify store with your Dropshipp account"
        >
          {accountConnectionMarkup}
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection
          title="Selling and Shipping"
          description="Manage products,pricing, shipping and customer notifications."
        >
          <Card sectioned title="Products">
            <Checkbox
              checked={sendMail}
              onChange={() => setSendMail((current) => !current)}
              label="Automatically publish new products"
              helpText="New products added in DropShipp will immediately be published to all of your Shopify sales channels"
            />
          </Card>

          <Card sectioned title="Pricing rules">
            <Stack alignment="baseline">
              <span>Product list price = Your cost </span>
              <span>{pricingRuleMethod === "Multiplier" ? "x" : "+"}</span>
              <div>
                <TextField
                  connectedLeft={pricingRuleInput}
                  value={pricingModifier}
                  onChange={(value) => setPricingModifier(value)}
                />
              </div>
            </Stack>
          </Card>

          <Card sectioned title="Shipping">
            <FormLayout>
              <Checkbox
                checked={autoPublish}
                onChange={() => setAutoPublish((current) => !current)}
                label="Email customers when orders are fulfilled"
              />

              <TextField
                value={trackingUrl}
                onChange={(value) => setTrackingUrl(value)}
                label="Custom shipping tracking URL"
                helpText={
                  <span>
                    Ovverrides the normal shipment tracking link emailed to your
                    customer.
                    <Link url="https://github.com/akh-47">
                      Learn more about custom tracking
                    </Link>
                  </span>
                }
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Reporting"
          description="Manage how you track success with dropship"
        >
          <Card sectioned>
            <VisuallyHidden>
              <Heading>Reporting Details</Heading>
            </VisuallyHidden>
            <ChoiceList
              title="Recieve reports via email"
              choices={[
                { label: "Never", value: "Never" },
                { label: "Daily", value: "Daily" },
                { label: "Weekly", value: "Weekly" },
                { label: "Monthly", value: "Monthly" },
              ]}
              selected={reportingEmailFrequency}
              onChange={(value) => setReportingEmailFrequency(value)}
            />
          </Card>
        </Layout.AnnotatedSection>

        <Layout.Section>
          <PageActions primaryAction={{ content: "Save", submit: true }} />
        </Layout.Section>
      </Layout>
    </form>
  );
}
