import { FormEvent, useCallback, useEffect } from 'react';
import useSeoData from 'src/hooks/useSeoData';
import { Headings, SeoHeading, Seo as SeoInterface } from 'src/models/seo';
import { Button, TextField, Box } from '@mui/material';
import { SnackbarUtilities } from 'src/utilities';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React from 'react';
import { validateUrl } from 'src/utilities';
import { getAnalyseUrlSeo } from 'src/services';
import { createUrlsSeo, getUrlsSeo } from 'src/api/user';
import { useAppSelector } from 'src/hooks/useApp';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { FormControlUrl } from 'src/components/FormControlUrl';
import Cookies from 'js-cookie';

const Seo = () => {
  const {
    url,
    setUrl,
    urlsRecent,
    setUrlsRecent,
    headings,
    setHeadings,
    title,
    setTitle,
    description,
    setDescription,
    countLinks,
    setCountLinks,
    handleChange,
  } = useSeoData();

  const { _id } = useAppSelector((state) => state.user.userInfo);

  const getUrlSeo = async (_id: string) => {
    const urls = await (await getUrlsSeo(_id)).data;
    return urls;
  };

  const { data: dataUrlSeo } = useQuery({
    queryKey: ['urlSeo'],
    queryFn: () => {
      if (_id) return getUrlSeo(_id);
    },
    cacheTime: 10000,
    staleTime: 10000,
  });

  useEffect(() => {
    if (dataUrlSeo) {
      const onlyUrl = dataUrlSeo.map((seo: SeoInterface) => seo.url);
      setUrlsRecent(onlyUrl);
    }
  }, [dataUrlSeo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateUrl(url)) {
      if (!urlsRecent.includes(url)) {
        const newArray = [...urlsRecent, url];
        setUrlsRecent(newArray);
      }

      try {
        const response = await getAnalyseUrlSeo(url);

        const headings: Headings[] = [];

        for (let i = 0; i <= 6; i++) {
          if (response.data[`h${i}`]?.length) {
            headings.push({ [`h${i}`]: response.data[`h${i}`] });
          }
        }

        setHeadings(headings);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCountLinks(response.data.links.length);

        if (!urlsRecent.includes(url)) {
          if (id) createUrlsSeo(id, url);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      SnackbarUtilities.error('Url inválida');
    }
  };

  return (
    <section className='p-16'>
      <div className='w-1/3'>
        <h2>Seo</h2>
        <p>Bienvenido a Seo</p>

        <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <FormControlUrl setUrl={setUrl} urlsRecent={urlsRecent} />

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Escribe URL'
            name='url'
            autoComplete='url'
            autoFocus
            onChange={handleChange}
            value={url}
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Analizar
          </Button>
        </Box>
      </div>

      <div className='flex'>
        {headings?.length ? (
          <div className='mx-8'>
            <>
              <h2 className='text-2xl font-bold  mt-10 mb-5'>Headings</h2>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 700,
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 700,
                  '& ul': { padding: 0 },
                  bgcolor: '#cbdaf3',
                }}
                subheader={<li />}
              >
                {headings.map((heading) => {
                  const singleKey = Object.keys(heading)[0] as keyof SeoHeading;
                  return (
                    <>
                      <li key={`section-${Object.keys(heading)[0]}`}>
                        <ul>
                          <ListSubheader sx={{ bgcolor: '#bfbff1', color: 'black' }}>
                            {Object.keys(heading)[0]}
                          </ListSubheader>

                          <ListItem
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              padding: 0,
                              margin: 0,
                            }}
                            key={`item-${Object.keys(heading)[0]}-list`}
                          >
                            {heading[singleKey].map((e) => {
                              return (
                                <ListItemText
                                  sx={{
                                    borderTop: 1,
                                    borderColor: 'grey.500',
                                    width: '100%',
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    margin: 0,
                                  }}
                                  primary={e}
                                />
                              );
                            })}
                          </ListItem>
                        </ul>
                      </li>
                    </>
                  );
                })}
              </List>
            </>
          </div>
        ) : null}

        <div>
          {title ? (
            <div>
              <>
                <h2 className='text-2xl font-bold  mt-10 mb-5'>Title</h2>

                <List
                  key={title}
                  sx={{
                    width: '100%',
                    padding: 2,
                    maxWidth: 700,
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 700,
                    '& ul': { padding: 0 },
                    bgcolor: '#cbdaf3',
                    borderRadius: 1,
                  }}
                  subheader={<li />}
                >
                  {title}
                </List>
              </>
            </div>
          ) : null}

          {description ? (
            <div>
              <>
                <h2 className='text-2xl font-bold  mt-10 mb-5'>Description</h2>

                <List
                  sx={{
                    width: '100%',
                    padding: 2,
                    maxWidth: 700,
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 700,
                    '& ul': { padding: 0 },
                    bgcolor: '#cbdaf3',
                    borderRadius: 1,
                  }}
                  subheader={<li />}
                >
                  {description}
                </List>
              </>
            </div>
          ) : null}

          {countLinks ? (
            <div>
              <>
                <h2 className='text-2xl font-bold  mt-10 mb-5'>Links totales</h2>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 700,
                    '& ul': { padding: 0 },
                    bgcolor: '#cbdaf3',
                  }}
                  subheader={<li />}
                >
                  {countLinks}
                </List>
              </>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Seo;
