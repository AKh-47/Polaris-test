import React, { useState } from "react";
import {
  Layout,
  AccountConnection,
  Link,
  Card,
  Checkbox,
} from "@shopify/polaris";

import avatar from "../assets/avatar-placeholder.png";

export default function SettingsForm() {
  const [connected, setConnected] = useState(false);

  const [autoPublish, setAutoPublish] = useState(false);

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

  return (
    <form>
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
              checked={autoPublish}
              onChange={() => setAutoPublish((current) => !current)}
              label="Automatically publish new products"
              helpText="New products added in DropShipp will immediately be published to all of your Shopify sales channels"
            />
          </Card>
          <Card sectioned title="Pricing rules"></Card>
          <Card sectioned title="Shipping"></Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Reporting"
          description="Manage how you track success with dropship"
        >
          <Card sectioned></Card>
        </Layout.AnnotatedSection>
      </Layout>
    </form>
  );
}
