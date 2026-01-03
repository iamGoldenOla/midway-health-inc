import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DocumentFile {
  name: string;
  type: string;
}

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    classApplying: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    previousSchool: "",
    additionalInfo: "",
  });
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type,
      }));
      setDocuments((prev) => [...prev, ...newDocs]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email body
    const emailBody = `
NEW ADMISSION APPLICATION

STUDENT INFORMATION
-------------------
Student Name: ${formData.studentName}
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender}
Class Applying For: ${formData.classApplying}

PARENT/GUARDIAN INFORMATION
---------------------------
Parent Name: ${formData.parentName}
Phone: ${formData.parentPhone}
Email: ${formData.parentEmail}
Address: ${formData.address}

ACADEMIC BACKGROUND
-------------------
Previous School: ${formData.previousSchool || "N/A"}

ADDITIONAL INFORMATION
----------------------
${formData.additionalInfo || "N/A"}

DOCUMENTS TO BE SUBMITTED
-------------------------
${documents.length > 0 ? documents.map((d) => `- ${d.name}`).join("\n") : "No documents listed"}

Note: Please bring original documents to the school for verification.
    `.trim();

    // Open email client with pre-filled content
    const mailtoLink = `mailto:admissions@christthehaven.edu?subject=New Admission Application - ${encodeURIComponent(
      formData.studentName
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Application Prepared!",
        description:
          "Your email client should open with the application details. Please attach your documents and send.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 text-center shadow-card border border-border"
      >
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
          Application Initiated!
        </h3>
        <p className="text-muted-foreground mb-6">
          Your email client should have opened with your application details. Please attach the
          required documents to the email and send it to complete your application.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          If your email client didn't open, please send your application manually to:{" "}
          <a href="mailto:admissions@christthehaven.edu" className="text-secondary font-medium">
            admissions@christthehaven.edu
          </a>
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Submit Another Application
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
    >
      <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
        Online Application Form
      </h3>

      {/* Student Information */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Student Information
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="studentName">Student Full Name *</Label>
            <Input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              required
              placeholder="Enter student's full name"
            />
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <Label htmlFor="classApplying">Class Applying For *</Label>
            <select
              id="classApplying"
              name="classApplying"
              value={formData.classApplying}
              onChange={handleInputChange}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select class</option>
              <option value="creche">Creche</option>
              <option value="nursery1">Nursery 1</option>
              <option value="nursery2">Nursery 2</option>
              <option value="primary1">Primary 1</option>
              <option value="primary2">Primary 2</option>
              <option value="primary3">Primary 3</option>
              <option value="primary4">Primary 4</option>
              <option value="primary5">Primary 5</option>
              <option value="primary6">Primary 6</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Parent/Guardian Information
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="parentName">Parent/Guardian Name *</Label>
            <Input
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              required
              placeholder="Enter parent's full name"
            />
          </div>
          <div>
            <Label htmlFor="parentPhone">Phone Number *</Label>
            <Input
              id="parentPhone"
              name="parentPhone"
              type="tel"
              value={formData.parentPhone}
              onChange={handleInputChange}
              required
              placeholder="+234 xxx xxx xxxx"
            />
          </div>
          <div>
            <Label htmlFor="parentEmail">Email Address *</Label>
            <Input
              id="parentEmail"
              name="parentEmail"
              type="email"
              value={formData.parentEmail}
              onChange={handleInputChange}
              required
              placeholder="parent@email.com"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Home Address *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your home address"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Academic Background */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Academic Background
        </h4>
        <div>
          <Label htmlFor="previousSchool">Previous School (if any)</Label>
          <Input
            id="previousSchool"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleInputChange}
            placeholder="Name of previous school attended"
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Documents
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Select the documents you have ready. You'll attach them to the email when submitting.
        </p>

        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-secondary transition-colors">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="document-upload"
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">Click to select documents</p>
            <p className="text-sm text-muted-foreground">
              PDF, DOC, DOCX, JPG, PNG (will be listed for email attachment)
            </p>
          </label>
        </div>

        {documents.length > 0 && (
          <div className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-foreground">{doc.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="mb-8">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          placeholder="Any additional information you'd like to share..."
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="sky"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Preparing Application..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Application via Email
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By submitting this form, your email client will open with the application details.
        Please attach the required documents and send the email to complete your application.
      </p>
    </motion.form>
  );
};

export default ApplicationForm;
