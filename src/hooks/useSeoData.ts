import { Headings, urlSeo } from 'src/models/seo';
import { ChangeEvent, useState } from 'react';

const useSeoData = () => {
  const [url, setUrl] = useState('');
  const [headings, setHeadings] = useState<Headings[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [countLinks, setCountLinks] = useState();
  const [urlsRecent, setUrlsRecent] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urlSeoValue = e.target.value as urlSeo;
    setUrl(urlSeoValue);
  };

  return {
    url,
    setUrl,
    headings,
    setHeadings,
    title,
    setTitle,
    description,
    setDescription,
    countLinks,
    setCountLinks,
    handleChange,
    urlsRecent,
    setUrlsRecent,
  };
};

export default useSeoData;
