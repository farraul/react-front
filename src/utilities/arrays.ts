export const isEmpty = (value: number | null | string | undefined) => {
  if (typeof value === 'number' && isNaN(value)) return true;
  return value === undefined || value === null || value === '';
};

export const AddQueryByField = (options: Record<string, any>) => {
  const ArrayByField = Object.entries(options);

  let countQuery = 0;
  const resultArray = ArrayByField.map((item) => {
    if (isEmpty(item[1])) return null;

    const query = `${item[0]}=${item[1]}`;

    if (!countQuery) {
      countQuery = countQuery + 1;
      return `?${query}`;
    }

    countQuery = countQuery + 1;
    return `&${query}`;
  });

  return resultArray
    .filter((res) => res !== null)
    .join()
    .replace(/,/g, '');
};

