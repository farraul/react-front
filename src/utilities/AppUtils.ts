import { merge } from 'lodash';
import format from 'date-fns/format';
import * as colors from '@mui/material/colors';

class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = (...args) => {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      function (fn) {
        fn.apply(this, args);
      }.bind(this),
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

class AppUtils {
  static filterArrayByString(mainArr, searchText) {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => this.searchInObj(itemObj, searchText));
  }

  static searchInObj(itemObj, searchText) {
    if (!itemObj) {
      return false;
    }

    const propArray = Object.keys(itemObj);

    for (let i = 0; i < propArray.length; i += 1) {
      const prop = propArray[i];
      const value = itemObj[prop];

      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
    return false;
  }

  static searchInArray(arr, searchText) {
    arr.forEach((value) => {
      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
      return false;
    });
    return false;
  }

  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  static generateGUID() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static setRoutes(config, defaultAuth) {
    let routes = [...config.routes];

    routes = routes.map((route) => {
      let auth = config.auth || config.auth === null ? config.auth : defaultAuth || null;
      auth = route.auth || route.auth === null ? route.auth : auth;
      const settings = merge({}, config.settings, route.settings);

      return {
        ...route,
        settings,
        auth,
      };
    });

    return [...routes];
  }

  static generateRoutesFromConfigs(configs, defaultAuth) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config, defaultAuth)];
    });
    return allRoutes;
  }

  static findById(arr = [], id) {
    return arr.find((item) => item._id === id);
  }

  static randomMatColor(hue = '400') {
    const mainColors = [
      'red',
      'pink',
      'purple',
      'deepPurple',
      'indigo',
      'blue',
      'lightBlue',
      'cyan',
      'teal',
      'green',
      'lightGreen',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deepOrange',
    ];

    const randomColor = mainColors[Math.floor(Math.random() * mainColors.length)];
    return colors[randomColor][hue];
  }

  static dateToFilterFormat(date = null) {
    return format(new Date(date), 'dd/MM/yyyy');
  }

  static dateToFullFormat(date = null) {
    return format(new Date(date), 'dd/MM/yyyy, HH:mm');
  }

  static getFormValues(data) {
    if (data instanceof Array) {
      return data.map(AppUtils.getFormValues);
    }

    if (data && typeof data === 'object') {
      const result = {};
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && '_id' in value && 'name' in value) {
          result[key] = value._id;
        } else {
          result[key] = AppUtils.getFormValues(value);
        }
      });
      return result;
    }

    return data;
  }

  static getLegend(metadataItem) {
    const key = metadataItem.method.name.toLowerCase() + metadataItem.attribute;
    const name = `${metadataItem.method.name} ${metadataItem.attribute || ''} ${
      metadataItem.group
        ? Object.values(metadataItem.group)
            .map(({ value, alias }) => alias || value)
            .join(', ')
        : ''
    }`;

    return { key, name };
  }

  static findClosestIndex(items, targetY, activeIndex) {
    return items.reduce((closestIdx, currentObj, currentIndex) => {
      let { y } = currentObj.props.points[activeIndex];
      let index = activeIndex;

      if (y === null) {
        const validIndex = currentObj.props.points.findIndex((point) => point.y !== null);

        if (validIndex > -1) {
          index = validIndex;
          y = currentObj.props.points[index].y;
        }
      }

      const currentDistance = Math.abs(y - targetY);
      const closestDistance = Math.abs(items[closestIdx].props.points[index].y - targetY);

      return currentDistance < closestDistance ? currentIndex : closestIdx;
    }, 0);
  }

  static EventEmitter = EventEmitter;

  static hasPermission(authArr, userRole) {
    /**
     * If auth array is not defined
     * Pass and allow
     */
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    }
    if (authArr.length === 0) {
      /**
       * if auth array is empty means,
       * allow only user role is guest (null or empty[])
       */
      // console.info("auth is empty[]:", authArr);
      return !userRole || userRole.length === 0;
    }
    /**
     * Check if user has grants
     */
    // console.info("auth arr:", authArr);
    /*
            Check if user role is array,
            */
    if (userRole && Array.isArray(userRole)) {
      return authArr.some((r) => userRole.indexOf(r) >= 0);
    }

    /*
            Check if user role is string,
            */
    return authArr.includes(userRole);
  }
}

export default AppUtils;
