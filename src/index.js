import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from './Redux/store';
import 'react-phone-number-input/style.css';
// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Provider store={store}>
            <Toaster position="top-right" reverseOrder={false} />
            <App />
        </Provider>
    </ClerkProvider>);
