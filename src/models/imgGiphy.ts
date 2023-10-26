type Analytics = {
  onload: { [key: string]: object };
  onclick: { [key: string]: object };
  onsent: { [key: string]: object };
};

type Images = {
  original: { [key: string]: string };
  fixed_width: { [key: string]: string };
};

type DataApiResponse = {
  analytics: Analytics;
  analytics_response_payload: string;
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: Images;
  import_datetime: string;
  is_sticker: number;
  rating: string;
  slug: string;
  source: string;
  source_post_url: string;
  source_tld: string;
  title: string;
  trending_datetime: string;
  type: string;
  url: string;
  username: string;
};

export interface ApiResponse {
  data: Array<DataApiResponse>;
  meta: object;
  pagination: object;
}
