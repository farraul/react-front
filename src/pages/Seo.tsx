import { FormEvent, useEffect } from 'react';
import useSeoData from '@/hooks/useSeoData';
import { SeoHeading } from '@/models/seo';
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { SnackbarUtilities } from '@/utilities';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React from 'react';
import { validateUrl } from '@/utilities/validateUrl';
import { getSeo } from '@/api/rapi/seo';
import { getUrlsSeo } from '@/api/user';
import { useAppSelector } from '@/hooks/useApp';

const Seo = () => {
  const {
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
  } = useSeoData();

  const { userToken, _id } = useAppSelector((state) => state.user.userInfo);

  const urlsSeo = async () => {
    const urls = await (await getUrlsSeo(userToken, _id)).data;
    const urlsSolo = urls.map((obj: { url: string }) => obj.url);
    setUrlsRecent(urlsSolo);
  };

  useEffect(() => {
    _id && urlsSeo();
  }, [_id]);

  useEffect(() => {
    console.log({ urlsRecent });
  }, [urlsRecent]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateUrl(url)) {
      try {
        const response = await getSeo(url);

        let headings: any = [];

        for (let i = 0; i <= 6; i++) {
          if (response.data[`h${i}`]?.length) {
            headings.push({ [`h${i}`]: response.data[`h${i}`] });
          }
        }
        setHeadings(headings);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCountLinks(response.data.links.length);
      } catch (error) {
        console.error(error);
      }
    } else {
      SnackbarUtilities.error('Url inválida');
    }
  };

  return (
    <section className="p-16">
      <div className="w-1/3">
        <h2>Seo</h2>
        <p>Bienvenido a Seo</p>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Selecciona URL recientes
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={url}
              label="Url recientes"
              onChange={(event) => setUrl(event.target.value)}
            >
              {urlsRecent.map((url, index) => (
                <MenuItem key={index} value={url}>
                  {url}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Escribe URL"
            name="url"
            autoComplete="url"
            autoFocus
            onChange={handleChange}
            value={url}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Analizar
          </Button>
        </Box>
      </div>
      <div className="flex">
        {headings?.length ? (
          <div className="mx-8">
            <>
              <h2 className="text-2xl font-bold  mt-10 mb-5">Headings</h2>
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
                          <ListSubheader
                            sx={{ bgcolor: '#bfbff1', color: 'black' }}
                          >
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
                              console.log({ e });
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
                <h2 className="text-2xl font-bold  mt-10 mb-5">Title</h2>

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
                <h2 className="text-2xl font-bold  mt-10 mb-5">Description</h2>

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
                <h2 className="text-2xl font-bold  mt-10 mb-5">Links totales</h2>
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
