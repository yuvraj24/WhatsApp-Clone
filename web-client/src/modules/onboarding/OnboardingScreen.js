import React, { useEffect, useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { syncProfile } from "../../api/webApiController";
import { auth, firebaseConfigured } from "../../utils/firebase";
import "./OnboardingScreen.css";

const OnboardingScreen = () => {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneForVerification, setPhoneForVerification] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaVerifier = useRef(null);

  useEffect(
    () => () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
      }
    },
    []
  );

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();

    const callingCode = countryCode.replace(/\s/g, "");
    const localNumber = phoneNumber.replace(/\D/g, "");
    const fullNumber = `${callingCode.slice(1)}${localNumber}`;

    if (
      !/^\+[1-9]\d{0,2}$/.test(callingCode) ||
      !/^\d{7,15}$/.test(fullNumber)
    ) {
      setStatus("Enter a valid country code and phone number.");
      return;
    }

    if (!firebaseConfigured || !auth) {
      setStatus("Firebase is not configured. No SMS was sent.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    try {
      if (!recaptchaVerifier.current) {
        recaptchaVerifier.current = new RecaptchaVerifier(
          auth,
          "fr-recaptcha-container",
          { size: "invisible" }
        );
      }

      const fullPhoneNumber = `${callingCode}${localNumber}`;
      const result = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        recaptchaVerifier.current
      );
      setPhoneForVerification(fullPhoneNumber);
      setConfirmationResult(result);
      setStatus(`A verification code was sent to ${fullPhoneNumber}.`);
    } catch (error) {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
        recaptchaVerifier.current = null;
      }
      setStatus(
        error.code === "auth/too-many-requests"
          ? "Too many attempts. Wait a while before requesting another code."
          : "Firebase could not send a verification code. Check the Firebase setup and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!confirmationResult || !/^\d{6}$/.test(verificationCode)) {
      setStatus("Enter the six-digit verification code.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    try {
      await confirmationResult.confirm(verificationCode);
      await syncProfile(displayName);
      window.location.hash = "/chat";
    } catch (error) {
      setStatus(
        error.response
          ? "Your account could not be saved. Please try again."
          : "That verification code could not be confirmed. Check it and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPhoneEntry = () => {
    setConfirmationResult(null);
    setVerificationCode("");
    setPhoneForVerification("");
    setStatus("");
  };

  const clearStatus = () => setStatus("");

  return (
    <main className="fr-onboarding">
      <header className="fr-onboarding__header">
        <div className="fr-brand" aria-label="FRWhatsapp">
          <span className="fr-brand__mark" aria-hidden="true">
            FR
          </span>
          <span className="fr-brand__name">FRWhatsapp</span>
        </div>
        <span className="fr-onboarding__header-note">
          A little closer, every day.
        </span>
      </header>

      <section className="fr-onboarding__content">
        <div className="fr-onboarding__intro">
          <span className="fr-onboarding__eyebrow">YOUR SPACE TO CONNECT</span>
          <h1>Good conversations start here.</h1>
          <p>
            A simple place for your everyday chats, built around the people who
            matter to you.
          </p>

          <div className="fr-chat-preview" aria-hidden="true">
            <div className="fr-chat-preview__topline">
              <span className="fr-chat-preview__avatar">A</span>
              <span className="fr-chat-preview__person">
                <strong>Alex</strong>
                <small>online now</small>
              </span>
              <span className="fr-chat-preview__dots">•••</span>
            </div>
            <div className="fr-chat-preview__messages">
              <span className="fr-chat-preview__bubble fr-chat-preview__bubble--received">
                Hey! How have you been?
              </span>
              <span className="fr-chat-preview__bubble fr-chat-preview__bubble--sent">
                Really good. Let’s catch up soon ✨
              </span>
            </div>
          </div>
        </div>

        <div className="fr-signup-card">
          <span className="fr-signup-card__step">GET STARTED</span>
          <h2>Join FRWhatsapp</h2>
          <p className="fr-signup-card__description">
            {confirmationResult
              ? `Enter the code sent to ${phoneForVerification}.`
              : "Verify your phone number to create your FRWhatsapp account."}
          </p>

          <form
            onSubmit={
              confirmationResult ? handleVerify : handlePhoneSubmit
            }
            noValidate
          >
            {confirmationResult ? (
              <>
                <label className="fr-field-label" htmlFor="fr-verification-code">
                  Verification code
                </label>
                <input
                  className="fr-phone-input"
                  id="fr-verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength="6"
                  placeholder="6-digit code"
                  value={verificationCode}
                  onChange={(event) => {
                    setVerificationCode(event.target.value.replace(/\D/g, ""));
                    clearStatus();
                  }}
                  aria-describedby="fr-phone-hint"
                />
                <p className="fr-signup-card__hint" id="fr-phone-hint">
                  Check your SMS messages for the code.
                </p>
                <button
                  className="fr-continue-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify and continue"}
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  className="fr-text-button"
                  type="button"
                  onClick={resetPhoneEntry}
                >
                  Use a different phone number
                </button>
              </>
            ) : (
              <>
                <label className="fr-field-label" htmlFor="fr-display-name">
                  Your name
                </label>
                <input
                  className="fr-phone-input"
                  id="fr-display-name"
                  type="text"
                  autoComplete="name"
                  maxLength="40"
                  placeholder="How should people see you?"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                />
                <label className="fr-field-label" htmlFor="fr-country-code">
                  Country calling code
                </label>
                <input
                  className="fr-phone-input fr-phone-input--code"
                  id="fr-country-code"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-country-code"
                  value={countryCode}
                  onChange={(event) => {
                    setCountryCode(event.target.value);
                    clearStatus();
                  }}
                  aria-describedby="fr-phone-hint"
                />
                <label className="fr-field-label" htmlFor="fr-phone-number">
                  Phone number
                </label>
                <input
                  className="fr-phone-input"
                  id="fr-phone-number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Your phone number"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    clearStatus();
                  }}
                  aria-describedby="fr-phone-hint"
                />
                <p className="fr-signup-card__hint" id="fr-phone-hint">
                  Include your area code. Use digits, spaces, or dashes.
                </p>
                <button
                  className="fr-continue-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending code..." : "Send verification code"}
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
            <p className="fr-signup-card__status" role="status" aria-live="polite">
              {status}
            </p>
          </form>

          <div id="fr-recaptcha-container" />
          <p className="fr-signup-card__privacy">
            Your account is separate from WhatsApp. Your contacts can chat with
            you here after they create FRWhatsapp accounts.
          </p>
        </div>
      </section>

      <footer className="fr-onboarding__footer">
        <span>Made for everyday conversations.</span>
        <span>Independent app, not affiliated with Meta or WhatsApp.</span>
      </footer>
    </main>
  );
};

export default OnboardingScreen;
