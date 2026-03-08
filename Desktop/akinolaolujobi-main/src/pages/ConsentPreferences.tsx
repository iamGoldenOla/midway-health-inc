import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/shared/SEOHead';
import PageHero from '@/components/shared/PageHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, BarChart3, Megaphone, Settings, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CONSENT_KEY = 'gdpr-consent-preferences';

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const ConsentPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    localStorage.setItem('cookie-consent-accepted', 'true');
    setSaved(true);
    toast({
      title: 'Preferences saved',
      description: 'Your consent preferences have been updated successfully.',
    });
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const all: ConsentPreferences = { essential: true, analytics: true, marketing: true, functional: true };
    setPreferences(all);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(all));
    localStorage.setItem('cookie-consent-accepted', 'true');
    toast({
      title: 'All cookies accepted',
      description: 'You have accepted all cookie categories.',
    });
  };

  const handleRejectAll = () => {
    const minimal: ConsentPreferences = { essential: true, analytics: false, marketing: false, functional: false };
    setPreferences(minimal);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(minimal));
    localStorage.setItem('cookie-consent-accepted', 'false');
    toast({
      title: 'Non-essential cookies rejected',
      description: 'Only essential cookies will be used.',
    });
  };

  const categories = [
    {
      key: 'essential' as const,
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled as they handle things like security, cookie consent memory, and basic navigation.',
      locked: true,
    },
    {
      key: 'analytics' as const,
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with the website by collecting anonymous data. This includes Google Analytics for page views, session duration, and traffic sources.',
    },
    {
      key: 'marketing' as const,
      icon: Megaphone,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and measure the effectiveness of ad campaigns. Third-party services like Google AdSense may set these cookies.',
    },
    {
      key: 'functional' as const,
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced features like remembering your theme preference, language settings, and previously viewed content for a personalized experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Consent Preferences"
        description="Manage your cookie and data consent preferences on Akinola Olujobi's website."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-[7.25rem]">
        <PageHero 
          title="Consent Preferences"
          subtitle="Manage how we use your data"
        />
        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="bg-muted/50 border border-border rounded-lg p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We respect your right to privacy. Below you can review and manage your cookie preferences. 
                  Essential cookies are always active as they are necessary for the website to function. 
                  For all other categories, you can choose to enable or disable them at any time.
                  Read our{' '}
                  <a href="/cookie-policy" className="text-primary hover:underline font-medium">Cookie Policy</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>
                  {' '}for more details.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button variant="outline" onClick={handleRejectAll} className="flex-1">
                  Reject Non-Essential
                </Button>
              </div>

              <div className="space-y-4">
                {categories.map((cat) => (
                  <Card key={cat.key} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <cat.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{cat.title}</CardTitle>
                            {cat.locked && (
                              <span className="text-xs text-primary font-medium">Always Active</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={cat.key} className="sr-only">
                            Toggle {cat.title}
                          </Label>
                          <Switch
                            id={cat.key}
                            checked={preferences[cat.key]}
                            disabled={cat.locked}
                            onCheckedChange={(checked) =>
                              setPreferences((prev) => ({ ...prev, [cat.key]: checked }))
                            }
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed">
                        {cat.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button onClick={handleSave} size="lg" className="w-full gap-2">
                {saved ? <Check className="w-4 h-4" /> : null}
                {saved ? 'Preferences Saved!' : 'Save My Preferences'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConsentPreferences;
