export function buildQueryString(page: number = 0, ordering: string = '', pageSize: number = 10, filter: any): string {
  const queryString = [];
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
    filterString += `${key}=${filter[key]}&`;
  });
  return filterString;
}

export function formatDateToString(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
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
