export type SanityEnvironment = {
  PUBLIC_SANITY_PROJECT_ID?: string;
  PUBLIC_SANITY_DATASET?: string;
};

export type SiteSettings = {
  brandName?: string;
  brandTagline?: string;
  navShopLabel?: string;
  navMissionLabel?: string;
  navContactLabel?: string;
  browseShopAriaLabel?: string;
  accountAriaLabel?: string;
  cartAriaLabel?: string;
  footerText?: string;
  footerShopLabel?: string;
  footerMissionLabel?: string;
  footerContactLabel?: string;
  logoUrl?: string;
  topoUrl?: string;
  socialShareUrl?: string;
};

export type HomePage = {
  seoTitle?: string;
  seoDescription?: string;
  heroLine1?: string;
  heroLine2?: string;
  heroLine3?: string;
  heroLine4?: string;
  heroTaglineLine1?: string;
  heroTaglineLine2?: string;
  heroButtonLabel?: string;
  value1Title?: string;
  value1Subtitle?: string;
  value2Title?: string;
  value2Subtitle?: string;
  value3Title?: string;
  value3Subtitle?: string;
  missionEyebrow?: string;
  missionHeading?: string;
  missionButtonLabel?: string;
  missionSideLine1?: string;
  missionSideLine2?: string;
  missionSideLine3?: string;
  missionSideLine4?: string;
  signupEyebrow?: string;
  signupHeading?: string;
  signupBody?: string;
  signupEmailPlaceholder?: string;
  signupButtonLabel?: string;
  signupNote?: string;
  signupSending?: string;
  signupSuccess?: string;
  signupError?: string;
  signupSideLine1?: string;
  signupSideLine2?: string;
  signupSideLine3?: string;
  shopEyebrow?: string;
  shopHeading?: string;
  latestLeftAlt?: string;
  latestRightAlt?: string;
  latestLeftUrl?: string;
  latestRightUrl?: string;
};

export type MissionPage = {
  seoTitle?: string;
  seoDescription?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  paragraph1?: string;
  paragraph2?: string;
  ctaLabel?: string;
};

export type ContactPage = {
  seoTitle?: string;
  seoDescription?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  nameLabel?: string;
  emailLabel?: string;
  orderLabel?: string;
  orderPlaceholder?: string;
  topicLabel?: string;
  topicPlaceholder?: string;
  topicGeneral?: string;
  topicOrder?: string;
  topicProduct?: string;
  topicPartnership?: string;
  messageLabel?: string;
  submitLabel?: string;
  sendingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
};

export type ShopPage = {
  seoTitle?: string;
  seoDescription?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  productsHeading?: string;
  searchPlaceholder?: string;
  categoryLabel?: string;
  allCategoriesLabel?: string;
  availabilityLabel?: string;
  sortLabel?: string;
  sortFeaturedLabel?: string;
  sortNewestLabel?: string;
  sortPriceLowLabel?: string;
  sortPriceHighLabel?: string;
  sortNameLabel?: string;
  viewCartLabel?: string;
  viewDetailsLabel?: string;
  noResultsHeading?: string;
  noResultsBody?: string;
  card1Title?: string;
  card1Body?: string;
  card2Title?: string;
  card2Body?: string;
  card3Title?: string;
  card3Body?: string;
  card4Title?: string;
  card4Body?: string;
};

const defaultProjectId = 'iec4sn1b';
const apiVersion = '2025-02-19';

async function sanityQuery<T>(query: string, environment?: SanityEnvironment): Promise<T | null> {
  const env = environment ?? import.meta.env;
  const projectId = env.PUBLIC_SANITY_PROJECT_ID || defaultProjectId;
  const dataset = env.PUBLIC_SANITY_DATASET || 'production';
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {headers: {Accept: 'application/json'}});
    if (!response.ok) return null;
    const payload = await response.json() as {result?: T};
    return payload.result ?? null;
  } catch {
    return null;
  }
}

export async function getSiteSettings(environment?: SanityEnvironment): Promise<SiteSettings> {
  return await sanityQuery<SiteSettings>(`*[_id == "siteSettings"][0]{
    brandName, brandTagline, navShopLabel, navMissionLabel, navContactLabel,
    browseShopAriaLabel, accountAriaLabel, cartAriaLabel,
    footerText, footerShopLabel, footerMissionLabel, footerContactLabel,
    "logoUrl": logo.asset->url,
    "topoUrl": topoBackground.asset->url,
    "socialShareUrl": socialShareImage.asset->url
  }`, environment) ?? {};
}

export async function getHomePage(environment?: SanityEnvironment): Promise<HomePage> {
  return await sanityQuery<HomePage>(`*[_id == "homePage"][0]{
    seoTitle, seoDescription,
    heroLine1, heroLine2, heroLine3, heroLine4,
    heroTaglineLine1, heroTaglineLine2, heroButtonLabel,
    value1Title, value1Subtitle, value2Title, value2Subtitle, value3Title, value3Subtitle,
    missionEyebrow, missionHeading, missionButtonLabel,
    missionSideLine1, missionSideLine2, missionSideLine3, missionSideLine4,
    signupEyebrow, signupHeading, signupBody, signupEmailPlaceholder, signupButtonLabel,
    signupNote, signupSending, signupSuccess, signupError,
    signupSideLine1, signupSideLine2, signupSideLine3,
    shopEyebrow, shopHeading, latestLeftAlt, latestRightAlt,
    "latestLeftUrl": latestLeftImage.asset->url,
    "latestRightUrl": latestRightImage.asset->url
  }`, environment) ?? {};
}

export async function getMissionPage(environment?: SanityEnvironment): Promise<MissionPage> {
  return await sanityQuery<MissionPage>(`*[_id == "missionPage"][0]{seoTitle, seoDescription, eyebrow, heading, intro, paragraph1, paragraph2, ctaLabel}`, environment) ?? {};
}

export async function getContactPage(environment?: SanityEnvironment): Promise<ContactPage> {
  return await sanityQuery<ContactPage>(`*[_id == "contactPage"][0]{
    seoTitle, seoDescription, eyebrow, heading, intro,
    nameLabel, emailLabel, orderLabel, orderPlaceholder,
    topicLabel, topicPlaceholder, topicGeneral, topicOrder, topicProduct, topicPartnership,
    messageLabel, submitLabel, sendingMessage, successMessage, errorMessage
  }`, environment) ?? {};
}

export async function getShopPage(environment?: SanityEnvironment): Promise<ShopPage> {
  return await sanityQuery<ShopPage>(`*[_id == "shopPage"][0]{
    seoTitle, seoDescription, eyebrow, heading, intro,
    productsHeading, searchPlaceholder, categoryLabel, allCategoriesLabel, availabilityLabel,
    sortLabel, sortFeaturedLabel, sortNewestLabel, sortPriceLowLabel, sortPriceHighLabel, sortNameLabel,
    viewCartLabel, viewDetailsLabel, noResultsHeading, noResultsBody,
    card1Title, card1Body, card2Title, card2Body, card3Title, card3Body, card4Title, card4Body
  }`, environment) ?? {};
}

// Backward-compatible aliases for older imports.
export const getSiteMedia = getSiteSettings;
export const getHomeMedia = getHomePage;
