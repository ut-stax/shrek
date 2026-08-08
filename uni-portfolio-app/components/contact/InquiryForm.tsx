"use client";

import { useMemo, useState } from "react";

type InquiryFormState = {
  services: string[];
  budget_range: "<25k" | "25k-50k" | "50k-100k" | "100k+" | "";
  estimated_timeline: string;
  project_description: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  referral_source: string;
  attachmentName: string;
};

const serviceOptions = [
  { value: "brand_identity", label: "Brand Identity" },
  { value: "digital_experience", label: "Digital Experience" },
  { value: "motion_design", label: "Motion Design" },
  { value: "interactive", label: "Interactive" },
];

const budgetOptions = ["<25k", "25k-50k", "50k-100k", "100k+"] as const;

const emptyState: InquiryFormState = {
  services: [],
  budget_range: "",
  estimated_timeline: "",
  project_description: "",
  name: "",
  email: "",
  company: "",
  phone: "",
  referral_source: "",
  attachmentName: "",
};

function validateStep(step: number, state: InquiryFormState) {
  if (step === 1 && state.services.length === 0) {
    return "Please choose at least one service.";
  }

  if (step === 2 && !state.budget_range) {
    return "Please select a budget range.";
  }

  if (step === 3 && state.project_description.trim().length < 20) {
    return "Your project brief must be at least 20 characters.";
  }

  if (step === 4) {
    if (state.name.trim().length < 2) {
      return "Please add your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      return "Please add a valid email address.";
    }
  }

  return "";
}

export function InquiryForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<InquiryFormState>(emptyState);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepLabel = useMemo(() => `Step ${step} of 4`, [step]);

  const toggleService = (value: string) => {
    setState((current) => ({
      ...current,
      services: current.services.includes(value)
        ? current.services.filter((service) => service !== value)
        : [...current.services, value],
    }));
  };

  const nextStep = () => {
    const validationMessage = validateStep(step, state);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setError("");
    setStep((current) => Math.min(4, current + 1));
  };

  const previousStep = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const submitForm = async () => {
    const validationMessage = validateStep(4, state);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      setSuccessMessage("Thank you. Your inquiry has been received and a confirmation email has been sent.");
      setState(emptyState);
      setStep(1);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileLimit = (file?: File | null) => {
    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Attachment must be 10MB or smaller.");
      return;
    }

    setError("");
    setState((current) => ({ ...current, attachmentName: file.name }));
  };

  return (
    <section style={{ backgroundColor: "var(--color-warm-cream)", borderRadius: "var(--radius-card)", padding: "var(--spacing-section)", border: "1px solid var(--color-pale-gray)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--spacing-md-2)", flexWrap: "wrap", marginBottom: "var(--spacing-md-2)" }}>
        <div>
          <p className="text-caption-small" style={{ opacity: 0.6, marginBottom: "var(--spacing-xs)" }}>{stepLabel}</p>
          <h2 className="text-display-subhead">Inquiry Form</h2>
        </div>
        <p className="text-caption-small" style={{ maxWidth: "320px", opacity: 0.7 }}>
          This local build includes the full multi-step workflow and a working demo API endpoint.
        </p>
      </div>

      {(error || successMessage) && (
        <div style={{ marginBottom: "var(--spacing-md-2)", padding: "12px 16px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-pale-gray)", backgroundColor: "var(--color-white)" }}>
          <p className="text-body-default">{error || successMessage}</p>
        </div>
      )}

      <div style={{ display: "grid", gap: "var(--spacing-md-2)" }}>
        {step === 1 && (
          <div>
            <p className="text-body-large" style={{ marginBottom: "var(--spacing-sm-1)" }}>Select the services you need.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--spacing-sm-2)" }}>
              {serviceOptions.map((option) => (
                <label key={option.value} style={{ display: "flex", gap: "var(--spacing-sm-2)", alignItems: "center", padding: "12px 14px", border: "1px solid var(--color-light-silver)", borderRadius: "var(--radius-subtle)", backgroundColor: "var(--color-white)" }}>
                  <input type="checkbox" checked={state.services.includes(option.value)} onChange={() => toggleService(option.value)} />
                  <span className="text-body-default">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "grid", gap: "var(--spacing-md-2)" }}>
            <div>
              <p className="text-body-large" style={{ marginBottom: "var(--spacing-sm-1)" }}>Budget range</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm-2)" }}>
                {budgetOptions.map((budget) => (
                  <label key={budget} style={{ display: "inline-flex", gap: "var(--spacing-xs)", alignItems: "center", padding: "10px 14px", border: "1px solid var(--color-light-silver)", borderRadius: "var(--radius-pill)", backgroundColor: state.budget_range === budget ? "var(--color-near-black)" : "var(--color-white)", color: state.budget_range === budget ? "var(--color-off-white-cream)" : "var(--color-near-black)" }}>
                    <input type="radio" name="budget" checked={state.budget_range === budget} onChange={() => setState((current) => ({ ...current, budget_range: budget }))} />
                    <span className="text-body-default">{budget}</span>
                  </label>
                ))}
              </div>
            </div>

            <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
              <span className="text-body-large">Target timeline</span>
              <input value={state.estimated_timeline} onChange={(event) => setState((current) => ({ ...current, estimated_timeline: event.target.value }))} placeholder="For example, Q4 2026" style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
            </label>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "grid", gap: "var(--spacing-md-2)" }}>
            <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
              <span className="text-body-large">Project brief</span>
              <textarea value={state.project_description} onChange={(event) => setState((current) => ({ ...current, project_description: event.target.value }))} rows={7} placeholder="Tell us about your goals, audience, deliverables, and any constraints." style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)", resize: "vertical" }} />
            </label>

            <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
              <span className="text-body-large">Attachment</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(event) => fileLimit(event.target.files?.[0])} />
              <span className="text-caption-small" style={{ opacity: 0.6 }}>PDF, DOC, or DOCX up to 10MB.</span>
              {state.attachmentName && <span className="text-caption-small">Selected file: {state.attachmentName}</span>}
            </label>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "grid", gap: "var(--spacing-md-2)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--spacing-md-2)" }}>
              <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
                <span className="text-body-large">Name</span>
                <input value={state.name} onChange={(event) => setState((current) => ({ ...current, name: event.target.value }))} style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
              </label>
              <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
                <span className="text-body-large">Email</span>
                <input value={state.email} onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))} style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
              </label>
              <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
                <span className="text-body-large">Company</span>
                <input value={state.company} onChange={(event) => setState((current) => ({ ...current, company: event.target.value }))} style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
              </label>
              <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
                <span className="text-body-large">Phone</span>
                <input value={state.phone} onChange={(event) => setState((current) => ({ ...current, phone: event.target.value }))} style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
              </label>
            </div>

            <label style={{ display: "grid", gap: "var(--spacing-sm-1)" }}>
              <span className="text-body-large">How did you hear about us?</span>
              <input value={state.referral_source} onChange={(event) => setState((current) => ({ ...current, referral_source: event.target.value }))} placeholder="Referral, search, social, award site, etc." style={{ padding: "12px 14px", borderRadius: "var(--radius-subtle)", border: "1px solid var(--color-light-silver)" }} />
            </label>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--spacing-md-1)", flexWrap: "wrap", paddingTop: "var(--spacing-sm-3)", borderTop: "1px solid var(--color-light-silver)" }}>
          <button type="button" onClick={previousStep} disabled={step === 1 || isSubmitting} className="btn-filter">
            Previous Step
          </button>

          {step < 4 ? (
            <button type="button" onClick={nextStep} disabled={isSubmitting} className="btn-primary">
              Next Step
            </button>
          ) : (
            <button type="button" onClick={submitForm} disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}