import {formatDate} from '@angular/common';


export const MIN_TIME = '00:00:00.000000';
export const MAX_TIME = '23:59:59.999999';


export function buildQueryString(page: number = 0, ordering: string = '', page_size: number = 10, filter: any): string {
  const queryString = [];
  page = page === 0 ? page + 1 : page;
  if (ordering) {
    queryString.push(`ordering=${ordering}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (filter) {
    queryString.push(buildFilterString(filter));
  }
  if (queryString.length > 0) {
    return '?' + queryString.join('&');
  }
  return '';
}

function buildFilterString(filter: { [key: string]: any }) {
  let filterString = '';
  Object.keys(filter).forEach((key) => {
    filterString += filter[key] ? `${key}=${filter[key]}&` : '';
  });
  return filterString;
}

export function formatDateToString(date: Date | string, time: string = ''): string {
  if (typeof date === 'object') {
    let formattedDate: string = formatDate(date, 'yyyy-MM-dd', 'en-us');
    if (time) {
      formattedDate += `+${time}`;
    }
    return formattedDate;
  }
  return date;
}


/**
 * Convert Mat Sort Header Direction to required sign for backend.
 * @param active:         Field name
 * @param direction:      Mat Sort Direction
 * @return sort:          '-' if directions is desc and '' otherwise
 */
export function getSort(active: string, direction: 'asc' | 'desc' | '') {
  const sort = direction === 'desc' ? '-' : '';
  return sort + active;
}


export class ConfirmationDialogDataModel {
  title: string;
  message: string;
  cancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}


export class APIResponse {
  data: any;
  pagination: {
    count: number,
    next: string,
    previous: string
  };
}
