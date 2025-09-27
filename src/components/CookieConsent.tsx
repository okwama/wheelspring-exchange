import { useEffect, useState } from "react";

const COOKIE_KEY = "gsc_consent";

type Consent = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const getConsent = (): Consent | null => {
  try {
    const value = document.cookie.split('; ').find(r => r.startsWith(`${COOKIE_KEY}=`));
    if (!value) return null;
    const json = decodeURIComponent(value.split('=')[1]);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const setConsent = (consent: Consent) => {
  const json = encodeURIComponent(JSON.stringify(consent));
  const days = 180;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_KEY}=${json}; Expires=${expires}; Path=/; SameSite=Lax`;
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) setVisible(true);
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true, updatedAt: new Date().toISOString() });
    setVisible(false);
  };

  const save = () => {
    setConsent({ analytics, marketing, updatedAt: new Date().toISOString() });
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-3xl rounded-lg border bg-background shadow-lg p-4">
        <div className="text-sm">
          We use cookies to enhance your experience. Manage your preferences below. See our Privacy and Cookie Policy.
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked disabled />
            Necessary (always on)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            Analytics
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            Marketing
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <button className="px-3 py-2 text-sm border rounded" onClick={save}>Save</button>
          <button className="px-3 py-2 text-sm bg-automotive-navy text-white rounded" onClick={acceptAll}>Accept All</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


