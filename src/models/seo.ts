export type urlSeo = `https://${string}` | '';

export interface SeoHeading {
  h1: string | string[];
  h2: string | string[];
  h3: string | string[];
}

export type Headings = {
  [K in keyof SeoHeading]: string[];
};

export interface Seo {
  _id: string;
  user: string;
  url: urlSeo;
}
