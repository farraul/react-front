import React from 'react';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation('translation', { keyPrefix: 'translation.home' });
  return (
    <section className="p-16">
      <h2>{t('home-page')}</h2>
    </section>
  );
}

export default HomePage;
