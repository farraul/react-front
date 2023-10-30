export type urlSeo = `https://${string}` | '';

export interface SeoHeading {
  h1: string | string[];
  h2: string | string[];
  h3: string | string[];
}

export type HeadingsSeo = {
  [key: string]: string[];
};
export type Headings = {
  [K in keyof HeadingsSeo]: string[];
};

export interface Seo {
  _id: string;
  user: string;
  url: urlSeo;
}
