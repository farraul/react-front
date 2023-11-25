import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }: any) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

export const ReactWindow = () => {
  return (
    <section className='p-16'>
      <h2 className=' text-xl font-bold mt-10'>
        Librería utilizada: react-window, react-virtualized-auto-sizer.
      </h2>
      <h2 className=' text-xl mt-3 mb-10'>
        Se puede ver como la lista va renderizando gracias a esta extensión con la extensión de
        Google Chrome para React en el apartado Profiler y grabando.
      </h2>

      <AutoSizer>
        {() => (
          <List className='List' height={400} itemCount={1000} itemSize={35} width={150}>
            {Row}
          </List>
        )}
      </AutoSizer>
    </section>
  );
};

export default ReactWindow;
