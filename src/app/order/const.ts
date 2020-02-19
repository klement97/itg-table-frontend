export function buildQueryString(page: number = 0, ordering: string = '', pageSize: number = 10, filter: any): string {
  const queryString = [];
  if (ordering) {
    queryString.push(`ordering=${ordering}`);
  }
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (filter) {
    queryString.push(`filter=${JSON.stringify(filter)}`);
  }
  if (queryString.length > 0) {
    return '?' + queryString.join('&');
  }
  return '';
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
