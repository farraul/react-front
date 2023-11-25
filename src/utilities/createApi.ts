interface Api {
  [key: string]: (id: number) => Promise<any>;
}

interface Resources {
  [index: string]: string;
}

function propertiesExist<T extends { [index: string]: string }>(object: T, prop: string) {
  const ojectFromEnum = Object.values(object);
  return ojectFromEnum.includes(prop);
}

export const createApi = (url: string, acceptedResources: Resources): Api => {
  return new Proxy(
    {},
    {
      get: (target, prop: string) => async (id: number) => {
        if (!propertiesExist(acceptedResources, prop)) {
          return Promise.reject({ error: `Resource ${prop} not accepted` });
        }

        const resource = `${url}/${prop}/${id}`;
        const res = await globalThis.fetch(resource);

        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({ error: `Something wrong happened with ${resource}` });
        }
      },
    },
  );
};
