const DEFAULT_SITE_ORIGIN = "https://kapcitytees.thewarriors.team";

export const SITE_NAME = "Barber Certified";
export const DEFAULT_SITE_DESCRIPTION =
  "Premium men's grooming essentials crafted with skin-safe ingredients to help you look sharp and feel confident every day.";

export interface SiteInfo {
  id: number;
  email: string;
  phone: string;
  copyright_text: string;
  logo: string;
  favicon: string;
}

interface SiteInfoApiResponse {
  success: boolean;
  message: string;
  data?: {
    data?: SiteInfo;
  };
}

const SITE_INFO_FALLBACK: SiteInfo = {
  id: 1,
  email: "support@barbercertified.com",
  phone: "+1 (000) 000-0000",
  copyright_text: "Copyright Barber Certified 2025",
  logo: "",
  favicon: "",
};

export const getSiteOrigin = (): string => {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    DEFAULT_SITE_ORIGIN;

  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
};

export const getSiteInfo = async (): Promise<SiteInfo> => {
  const apiBase = process.env.NEXT_PUBLIC_BASE_URL || getSiteOrigin();

  try {
    const endpoint = new URL("/site-info", apiBase).toString();
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
      },
      // SEO metadata can be cached; no need to refetch on every request.
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return SITE_INFO_FALLBACK;
    }

    const json = (await response.json()) as SiteInfoApiResponse;
    return json?.data?.data || SITE_INFO_FALLBACK;
  } catch {
    return SITE_INFO_FALLBACK;
  }
};