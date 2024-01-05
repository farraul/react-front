import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function DynamicMetaTags({ title }: any) {
  return (
    <Helmet>
      <meta name='title' content={title} />

      <title>{title}</title>
    </Helmet>
  );
}

DynamicMetaTags.propTypes = {
  title: PropTypes.string,
};

DynamicMetaTags.defaultProps = {
  title: 'Raúl far - Developer',
};

export default DynamicMetaTags;
