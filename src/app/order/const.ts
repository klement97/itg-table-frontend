export function buildQueryString(page: number = 0, ordering: string = '', page_size: number = 10, filter: any): string {
	const queryString = [];
	if (ordering) {
		queryString.push(`ordering=${ordering}`);
	}
	if (page) {
		queryString.push(`page=${page}`);
	}
	if (filter) {
		queryString.push(`${filter.serialize(this.FILTER_PREFIX)}`);
	}
	if (queryString.length > 0) {
		return '?' + queryString.join('&');
	}
	return '';
}
