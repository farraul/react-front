export type urlSeo = `https://${string}` | ""

export interface SeoHeading {
    h1: string | string[];
    h2: string | string[];
    h3: string | string[];
}

export type Headings = {
    [K in keyof SeoHeading]: string
}

export interface ISeo extends SeoHeading {
  description: string;
  keywords: string;
  links: string | string[];
  og_description: string;
  title: string;
  url: urlSeo
}
