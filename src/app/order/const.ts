export function buildQueryString(page: number = 0, ordering: string = '', page_size: number = 10, filter: any): string {
  const queryString = [];
  if (ordering) {
    queryString.push(`ordering=${ordering}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (filter) {
    queryString.push(`${buildFilterFromFormValues(filter)}`);
  }
  if (queryString.length > 0) {
    return '?' + queryString.join('&');
  }
  return '';
}

function buildFilterFromFormValues(form) {
  let filter = [];
  Object.entries(form).forEach(([key, value]) => {
    filter.push(`${key}=${value}`);
  });
  return filter.join('&');
}

export class ConfirmationDialogDataModel {
  title: string;
  message: string;
  cancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}
