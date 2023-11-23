import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import RenderPage from './RenderPage';

function HomePage() {
  const [render, setRender] = useState(false);
  const [param, setParam] = useState(100000000);

  // setTimeout(() => {
  //   setRender(true);
  // }, 4000);

  // setTimeout(() => {
  //   setRender(true);
  // }, 6000);
  // help with virtual DOM

  //  const expensiveMethod = () => {
  //   let result = 0
  //   for (let i = 0; i < 10000000; i++) {
  //      result += 1
  //   }
  //   return result
  //  } // high price

  // useEffect(() => {
  //   expensiveMethod()
  // }, [render]);

  // setInterval(() => {
  //   setRender(!render)
  // })

  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < param; i++) {
      result += 1;
    }
    console.log('calculator');
    return result;
  }, [param]); // high price - // Si no cambia el valor sera memorizado

  useEffect(() => {
    console.log('pepe');
  }, [render]);

  setInterval(() => {
    setRender(!render);
  });

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'translation.home' });
  return (
    <section className="p-16">
      <h2>{t('home-page')}</h2>
      <RenderPage render={render} />
    </section>
  );
}

export default HomePage;
