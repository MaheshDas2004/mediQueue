import { useState } from "react";
import API from "../../api/axios";

const RegisterPatient = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({
    // Basic Info
    name: "",
    age: "",
    gender: "",
    contact_number: "",
    address: "",
    physical_disability: false,
    department_id: "",
    // Symptoms
    symptoms: "",
    // Vitals
    body_temperature: "",
    blood_pressure: "",
    heart_rate: "",
    oxygen_lvl: "",
  });

  const [errors, setErrors] = useState({});

  const departments = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Orthopedics" },
    { id: 4, name: "Emergency / General" },
    { id: 5, name: "Pediatrics" },
    { id: 6, name: "Oncology" },
  ];

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!form.name.trim()) newErrors.name = "Patient name is required";
      if (!form.age || form.age < 1 || form.age > 120) newErrors.age = "Enter a valid age (1–120)";
      if (!form.gender) newErrors.gender = "Please select a gender";
      if (!form.contact_number.trim()) newErrors.contact_number = "Contact number is required";
      if (!form.department_id) newErrors.department_id = "Please select a department";
    }
    if (s === 2) {
      if (!form.symptoms.trim()) newErrors.symptoms = "Please describe the symptoms";
    }
    if (s === 3) {
      if (form.body_temperature && (form.body_temperature < 90 || form.body_temperature > 115))
        newErrors.body_temperature = "Temperature must be between 90–115 °F";
      if (form.oxygen_lvl && (form.oxygen_lvl < 50 || form.oxygen_lvl > 100))
        newErrors.oxygen_lvl = "Oxygen level must be between 50–100%";
      if (form.heart_rate && (form.heart_rate < 20 || form.heart_rate > 300))
        newErrors.heart_rate = "Enter a valid heart rate";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    setApiError("");

    try {
      const payload = {
        name: form.name,
        age: Number(form.age),
        gender: form.gender.toLowerCase(),
        contact_number: form.contact_number,
        address: form.address || undefined,
        physical_disability: form.physical_disability,
        department_id: Number(form.department_id),
        symptoms: form.symptoms || undefined,
        body_temperature: form.body_temperature ? Number(form.body_temperature) : undefined,
        blood_pressure: form.blood_pressure || undefined,
        heart_rate: form.heart_rate ? Number(form.heart_rate) : undefined,
        oxygen_lvl: form.oxygen_lvl ? Number(form.oxygen_lvl) : undefined,
      };

      await API.post("/patients/register", payload);
      setSubmitted(true);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      setApiError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: "", age: "", gender: "", contact_number: "", address: "",
      physical_disability: false, department_id: "", symptoms: "",
      body_temperature: "", blood_pressure: "", heart_rate: "", oxygen_lvl: "",
    });
    setErrors({});
    setStep(1);
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `w-full bg-white border ${
      errors[field] ? "border-red-400" : "border-gray-200"
    } rounded-xl px-4 py-3 text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all duration-200`;

  const labelClass = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-6xl text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 mb-2">Patient Registered</h2>
          <p className="text-[13px] text-gray-400 mb-1">
            <span className="font-semibold text-gray-700">{form.name}</span> has been added to the queue.
          </p>
          <p className="text-[13px] text-gray-400 mb-8">
            Department:{" "}
            <span className="font-semibold text-gray-700">
              {departments.find((d) => d.id === parseInt(form.department_id))?.name}
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-900 text-white text-[13px] font-semibold rounded-xl py-3 hover:bg-gray-700 transition-colors"
            >
              Register Another
            </button>
            <button
              onClick={handleReset}
              className="flex-1 border border-gray-200 text-gray-600 text-[13px] font-semibold rounded-xl py-3 hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-[20px] font-bold text-gray-900">Register Patient</h1>
          </div>
          <p className="text-[13px] text-gray-400 ml-11">Fill in the details to add a patient to the queue</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8">
          {[
            { n: 1, label: "Basic Info" },
            { n: 2, label: "Symptoms" },
            { n: 3, label: "Vitals" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${
                    step > s.n
                      ? "bg-gray-900 text-white"
                      : step === s.n
                      ? "bg-gray-900 text-white ring-4 ring-gray-200"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.n ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.n
                  )}
                </div>
                <span
                  className={`text-[12px] font-semibold hidden sm:block ${
                    step >= s.n ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className="flex-1 h-px mx-3 transition-all duration-300" style={{ background: step > s.n ? "#111827" : "#e5e7eb" }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Step 1 – Basic Info */}
          {step === 1 && (
            <div className="p-7">
              <div className="flex items-center gap-2 mb-6 pb-5 border-b border-gray-100">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-gray-900">Basic Information</h2>
                  <p className="text-[11px] text-gray-400">Patient identity and contact details</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ravi Kumar"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Age <span className="text-red-500">*</span></label>
                    <input
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="e.g. 34"
                      min={1}
                      max={120}
                      className={inputClass("age")}
                    />
                    {errors.age && <p className="text-red-500 text-[11px] mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className={inputClass("gender") + " cursor-pointer"}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-[11px] mt-1">{errors.gender}</p>}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className={labelClass}>Contact Number <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">+91</span>
                    <input
                      name="contact_number"
                      value={form.contact_number}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={inputClass("contact_number") + " pl-12"}
                    />
                  </div>
                  {errors.contact_number && <p className="text-red-500 text-[11px] mt-1">{errors.contact_number}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className={labelClass}>Address <span className="text-gray-300">(optional)</span></label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House no., Street, City..."
                    rows={2}
                    className={inputClass("address") + " resize-none"}
                  />
                </div>

                {/* Department */}
                <div>
                  <label className={labelClass}>Department <span className="text-red-500">*</span></label>
                  <select
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    className={inputClass("department_id") + " cursor-pointer"}
                  >
                    <option value="">Select department</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  {errors.department_id && <p className="text-red-500 text-[11px] mt-1">{errors.department_id}</p>}
                </div>

                {/* Physical Disability */}
                <div
                  onClick={() => setForm((p) => ({ ...p, physical_disability: !p.physical_disability }))}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    form.physical_disability ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${form.physical_disability ? "bg-gray-900" : "bg-gray-100"}`}>
                      <svg className={`w-4 h-4 ${form.physical_disability ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Physical Disability</p>
                      <p className="text-[11px] text-gray-400">Mark if the patient has a physical disability</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center px-0.5 ${form.physical_disability ? "bg-gray-900" : "bg-gray-200"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${form.physical_disability ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 – Symptoms */}
          {step === 2 && (
            <div className="p-7">
              <div className="flex items-center gap-2 mb-6 pb-5 border-b border-gray-100">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-gray-900">Symptoms</h2>
                  <p className="text-[11px] text-gray-400">Describe the patient's current complaints</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Chief Complaints / Symptoms <span className="text-red-500">*</span></label>
                  <textarea
                    name="symptoms"
                    value={form.symptoms}
                    onChange={handleChange}
                    placeholder="e.g. Severe chest pain since 2 hours, shortness of breath, dizziness..."
                    rows={6}
                    className={inputClass("symptoms") + " resize-none leading-relaxed"}
                  />
                  {errors.symptoms && <p className="text-red-500 text-[11px] mt-1">{errors.symptoms}</p>}
                  <p className="text-[11px] text-gray-400 mt-1.5">{form.symptoms.length} characters</p>
                </div>

                {/* Quick tags */}
                <div>
                  <label className={labelClass}>Common Complaints (tap to add)</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Chest pain", "Fever", "Headache", "Shortness of breath",
                      "Nausea", "Dizziness", "Back pain", "Fatigue", "Vomiting",
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            symptoms: p.symptoms
                              ? p.symptoms + ", " + tag
                              : tag,
                          }))
                        }
                        className="text-[12px] font-medium px-3 py-1.5 border border-gray-200 rounded-full hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-150"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary preview */}
                {form.name && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Patient Summary</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                        {form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-900">{form.name}</p>
                        <p className="text-[11px] text-gray-400">
                          {form.age} yrs · {form.gender} · {departments.find((d) => d.id === parseInt(form.department_id))?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 – Vitals */}
          {step === 3 && (
            <div className="p-7">
              <div className="flex items-center gap-2 mb-6 pb-5 border-b border-gray-100">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-gray-900">Vitals</h2>
                  <p className="text-[11px] text-gray-400">All fields are optional — enter if measured</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Body Temp + Heart Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Body Temperature</label>
                    <div className="relative">
                      <input
                        name="body_temperature"
                        type="number"
                        step="0.1"
                        value={form.body_temperature}
                        onChange={handleChange}
                        placeholder="98.6"
                        className={inputClass("body_temperature") + " pr-12"}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 font-medium">°F</span>
                    </div>
                    {errors.body_temperature && <p className="text-red-500 text-[11px] mt-1">{errors.body_temperature}</p>}
                    {form.body_temperature && !errors.body_temperature && (
                      <p className={`text-[11px] mt-1 font-medium ${parseFloat(form.body_temperature) > 100.4 ? "text-red-500" : "text-green-600"}`}>
                        {parseFloat(form.body_temperature) > 100.4 ? "⚠ Fever detected" : "✓ Normal range"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Heart Rate</label>
                    <div className="relative">
                      <input
                        name="heart_rate"
                        type="number"
                        value={form.heart_rate}
                        onChange={handleChange}
                        placeholder="72"
                        className={inputClass("heart_rate") + " pr-14"}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 font-medium">bpm</span>
                    </div>
                    {errors.heart_rate && <p className="text-red-500 text-[11px] mt-1">{errors.heart_rate}</p>}
                  </div>
                </div>

                {/* Blood Pressure + Oxygen */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Blood Pressure</label>
                    <div className="relative">
                      <input
                        name="blood_pressure"
                        value={form.blood_pressure}
                        onChange={handleChange}
                        placeholder="120/80"
                        className={inputClass("blood_pressure") + " pr-16"}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 font-medium">mmHg</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Format: systolic/diastolic</p>
                  </div>
                  <div>
                    <label className={labelClass}>Oxygen Level (SpO₂)</label>
                    <div className="relative">
                      <input
                        name="oxygen_lvl"
                        type="number"
                        value={form.oxygen_lvl}
                        onChange={handleChange}
                        placeholder="98"
                        min={50}
                        max={100}
                        className={inputClass("oxygen_lvl") + " pr-8"}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 font-medium">%</span>
                    </div>
                    {errors.oxygen_lvl && <p className="text-red-500 text-[11px] mt-1">{errors.oxygen_lvl}</p>}
                    {form.oxygen_lvl && !errors.oxygen_lvl && (
                      <p className={`text-[11px] mt-1 font-medium ${parseInt(form.oxygen_lvl) < 95 ? "text-red-500" : "text-green-600"}`}>
                        {parseInt(form.oxygen_lvl) < 95 ? "⚠ Below normal" : "✓ Normal range"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Vitals summary card */}
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {[
                    { label: "Temp", value: form.body_temperature ? `${form.body_temperature}°F` : "—", icon: "🌡️" },
                    { label: "HR", value: form.heart_rate ? `${form.heart_rate} bpm` : "—", icon: "❤️" },
                    { label: "BP", value: form.blood_pressure || "—", icon: "💉" },
                    { label: "SpO₂", value: form.oxygen_lvl ? `${form.oxygen_lvl}%` : "—", icon: "🫁" },
                  ].map((v) => (
                    <div key={v.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                      <div className="text-lg mb-1">{v.icon}</div>
                      <div className="text-[13px] font-bold text-gray-900">{v.value}</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{v.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer – Navigation Buttons */}
          <div className="flex items-center justify-between px-7 py-5 border-t border-gray-100 bg-gray-50/60">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 border border-gray-200 rounded-xl px-5 py-2.5 hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`rounded-full transition-all duration-300 ${
                    s === step ? "w-5 h-2 bg-gray-900" : s < step ? "w-2 h-2 bg-gray-900" : "w-2 h-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 text-[13px] font-semibold text-white bg-gray-900 rounded-xl px-5 py-2.5 hover:bg-gray-700 transition-colors"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 text-[13px] font-semibold text-white bg-gray-900 rounded-xl px-5 py-2.5 hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {loading ? "Registering..." : "Register Patient"}
              </button>
            )}
          </div>
          {apiError && (
            <div className="px-7 pb-3">
              <p className="text-sm text-red-500">{apiError}</p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-gray-400 mt-5">
          Fields marked <span className="text-red-500">*</span> are required · Patient will be placed in queue after registration
        </p>
      </div>
    </div>
  );
};

export default RegisterPatient;