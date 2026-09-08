export type SiteMedia = {
  logoUrl?: string;
  topoUrl?: string;
  socialShareUrl?: string;
};

export type HomeMedia = {
  latestLeftUrl?: string;
  latestRightUrl?: string;
};

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2025-02-19';

async function sanityQuery<T>(query: string): Promise<T | null> {
  if (!projectId) return null;

  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) return null;
    const payload = await response.json() as { result?: T };
    return payload.result ?? null;
  } catch {
    return null;
  }
}

export async function getSiteMedia(): Promise<SiteMedia> {
  return await sanityQuery<SiteMedia>(`*[_type == "siteSettings"][0]{
    "logoUrl": logo.asset->url,
    "topoUrl": topoBackground.asset->url,
    "socialShareUrl": socialShareImage.asset->url
  }`) ?? {};
}

export async function getHomeMedia(): Promise<HomeMedia> {
  return await sanityQuery<HomeMedia>(`*[_type == "homePage"][0]{
    "latestLeftUrl": latestLeftImage.asset->url,
    "latestRightUrl": latestRightImage.asset->url
  }`) ?? {};
}
