import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useSEO from "@/hooks/useSEO";

const consentItems = [
  "I consent to receive home healthcare services from Midway Health Inc.",
  "I understand that my health information will be used for treatment, payment, and healthcare operations as described in the Privacy Policy.",
  "I authorize Midway Health Inc. to share my medical information with other healthcare providers involved in my care.",
  "I acknowledge that I have been informed of my rights under HIPAA and have received a copy of the Notice of Privacy Practices.",
  "I consent to being contacted via phone, email, or text message regarding my care and appointments.",
];

const ConsentForm = () => {
  useSEO(
    "Consent Form | Midway Health Inc.",
    "Review and sign the patient consent form for Midway Health Inc. home healthcare services."
  );

  const { toast } = useToast();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState<boolean[]>(new Array(consentItems.length).fill(false));

  const allChecked = checked.every(Boolean) && name.trim() !== "" && date !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecked) return;
    toast({
      title: "Consent Submitted",
      description: "Thank you. Your consent form has been received.",
    });
    setName("");
    setDate("");
    setChecked(new Array(consentItems.length).fill(false));
  };

  const toggleCheck = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-[1.1]">
            Patient Consent Form
          </h1>
          <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
            Please review and acknowledge each item below to consent to receiving care from Midway Health Inc.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {consentItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <Checkbox
                  id={`consent-${i}`}
                  checked={checked[i]}
                  onCheckedChange={() => toggleCheck(i)}
                  className="mt-0.5"
                />
                <Label htmlFor={`consent-${i}`} className="text-sm text-foreground leading-relaxed cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div>
                <Label htmlFor="consent-name" className="text-sm font-medium mb-2 block">Full Name (Signature)</Label>
                <Input
                  id="consent-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="consent-date" className="text-sm font-medium mb-2 block">Date</Label>
                <Input
                  id="consent-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!allChecked}
              className="gradient-primary text-primary-foreground border-0 rounded-xl px-10 py-3 shadow-soft hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Submit Consent
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ConsentForm;
