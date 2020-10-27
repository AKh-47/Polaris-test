import React from "react";
import "./App.scss";

import { Page, AppProvider } from "@shopify/polaris";

import SettingsForm from "./Components/SettingsForm";

function App() {
  return (
    <AppProvider>
      <Page title="Settings">
        <SettingsForm />
      </Page>
    </AppProvider>
  );
}

export default App;
