export function buildQueryString(sort: string = '', sort_direction: string = '', page: number = 0, page_size: number = 10, filter: any): string {
	const queryString = [];
	if (sort) {
		queryString.push(`sort=${sort}`);
	}
	if (sort_direction) {
		queryString.push(`sort_direction=${sort_direction}`);
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

export let FAKE_ID = 1;
