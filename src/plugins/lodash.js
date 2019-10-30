import Vue from 'vue';
import each from 'lodash/each';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import indexOf from 'lodash/indexOf';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import differenceBy from 'lodash/differenceBy';
import reduce from 'lodash/reduce';

Object.defineProperty(Vue.prototype, '$lodash', {
  value: {
    each,
    orderBy,
    sortBy,
    indexOf,
    find,
    findIndex,
    includes,
    filter,
    groupBy,
    differenceBy,
    reduce,
  },
});
