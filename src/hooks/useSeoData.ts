import { Headings, urlSeo } from "@/models/seo";
import {ChangeEvent, useState} from "react";

const useSeoData = () => {
    const [url, setUrl] = useState('');
    const [headings, setHeadings] = useState<Headings[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [countLinks, setCountLinks] = useState();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const urlSeoValue = e.target.value as urlSeo
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
      }
}

export default useSeoData