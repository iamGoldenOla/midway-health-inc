import Layout from "@/components/layout/Layout";
import useSEO from "@/hooks/useSEO";

const PrivacyPolicy = () => {
  useSEO(
    "Privacy Policy | Midway Health Inc.",
    "Learn how Midway Health Inc. collects, uses, and protects your personal information."
  );

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-6">Last updated: February 13, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect personal information that you voluntarily provide to us when you express interest in our services, 
                including your name, email address, phone number, address, medical information relevant to care planning, 
                insurance details, and any other information you choose to provide through our forms or communications.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide and manage healthcare services, communicate with you about your care, 
                process your requests and appointments, send you relevant health information and updates, comply with legal and 
                regulatory requirements (including HIPAA), and improve our services and patient experience.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">3. HIPAA Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a healthcare provider, Midway Health Inc. is committed to protecting your Protected Health Information (PHI) 
                in accordance with the Health Insurance Portability and Accountability Act (HIPAA). We maintain strict physical, 
                electronic, and procedural safeguards to protect your health information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with 
                healthcare professionals involved in your care, insurance providers for billing purposes, regulatory agencies 
                as required by law, and service providers who assist us in operating our website and services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption, 
                secure servers, access controls, and regular security assessments. However, no method of transmission over the 
                Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may also request a copy of 
                your health records, restrict certain uses of your information, and file a complaint if you believe your 
                privacy rights have been violated. Contact us to exercise any of these rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:<br />
                <strong>Midway Health Inc.</strong><br />
                1434 W 76th Street, Chicago, IL 60620<br />
                Email: info@midwayhealthinc.com<br />
                Phone: (312) 298-9124
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
