type Analytics = {
    onload: { [key: string]: any };
    onclick: { [key: string]: any };
    onsent: { [key: string]: any };
  };
  
  type Images = {
    original: { [key: string]: any };
    fixed_width: { [key: string]: any };
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