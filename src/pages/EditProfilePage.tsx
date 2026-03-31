import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Save, X } from "lucide-react";
import TopAppBar from "@/components/TopAppBar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import useDocumentTitle from "@/hooks/use-document-title";

const EditProfilePage = () => {
  useDocumentTitle("Edit Profile");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Digital creator & file sharing enthusiast.",
    location: "San Francisco, CA",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    else if (form.firstName.trim().length > 50) newErrors.firstName = "Max 50 characters";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (form.lastName.trim().length > 50) newErrors.lastName = "Max 50 characters";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = "Invalid email";
    if (form.bio.length > 200) newErrors.bio = "Max 200 characters";
    if (form.location.length > 100) newErrors.location = "Max 100 characters";
    if (form.phone.length > 20) newErrors.phone = "Max 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    toast({ title: "Profile updated", description: "Your changes have been saved successfully." });
    navigate("/profile");
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const initials = `${form.firstName.charAt(0)}${form.lastName.charAt(0)}`.toUpperCase();

  const fields: { key: string; label: string; type?: string; placeholder: string; multiline?: boolean }[] = [
    { key: "firstName", label: "First Name", placeholder: "Enter first name" },
    { key: "lastName", label: "Last Name", placeholder: "Enter last name" },
    { key: "email", label: "Email", type: "email", placeholder: "Enter email address" },
    { key: "phone", label: "Phone", type: "tel", placeholder: "Enter phone number" },
    { key: "location", label: "Location", placeholder: "City, Country" },
    { key: "bio", label: "Bio", placeholder: "Tell us about yourself...", multiline: true },
  ];

  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />

      <main className="pt-20 px-4 md:px-8 lg:px-12 pb-28 md:pb-12 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-headline">
            Edit Profile
          </h1>
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-4xl font-extrabold shadow-lg">
              {initials}
            </div>
            <button className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-surface-container border-2 border-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Tap to change photo</p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-5 md:p-8 space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container-low text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors[field.key] ? "ring-2 ring-destructive/50 focus:ring-destructive" : "focus:ring-primary/30"
                  }`}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container-low text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                    errors[field.key] ? "ring-2 ring-destructive/50 focus:ring-destructive" : "focus:ring-primary/30"
                  }`}
                />
              )}
              {errors[field.key] && (
                <p className="text-xs text-destructive mt-1.5 font-medium">{errors[field.key]}</p>
              )}
            </div>
          ))}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 px-4 py-3 rounded-xl bg-surface-container text-foreground font-bold text-sm hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 gradient-primary text-primary-foreground px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
};

export default EditProfilePage;
