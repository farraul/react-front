import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/Ui/accordion';

function HomePage() {
  const { t } = useTranslation('translation', { keyPrefix: 'translation.home' });
  return (
    <section className='p-16'>
      <h2>{t('home-page')}</h2>

      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export default HomePage;
