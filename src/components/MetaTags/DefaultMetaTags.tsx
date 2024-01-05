import { Helmet } from 'react-helmet';
import React from 'react';

function DefaultMetaTags() {
  const title = 'App React - Material Design Admin Template';
  const description = 'App React - Material design admin template with pre-built apps and pages';

  return (
    <Helmet>
      <meta charSet='utf-8' />
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <title>{title}</title>
    </Helmet>
  );
}

export default DefaultMetaTags;
