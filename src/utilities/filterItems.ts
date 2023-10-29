export const filterItems = (query: string, items: any[]) => {
  if (query === '') {
    return items;
  }
  return items.filter((item: { title: string | any[]; }) => item.title.indexOf(query) === 0);
};
