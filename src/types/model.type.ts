export type WidgetDataTypes = {
	title: string;
	isMoney: boolean;
	link: string;
	icon: JSX.Element;
};

export type User = {
	id: number;
	name: string;
};

export type Tokens = {
	access_token: string;
	refresh_token: string;
};

export type Auth = {
	email: string;
	password: string;
};

export type Transaction = {
	id: string;
	createdAt: string;
	updatedAt: string;
	quantity: number;
	remarks: string;
	action: string;
	Item: {
		id: string;
		name: string;
		description: string;
		model: string;
		unit: string;
		quantity: number;
		price: number;
		pictureUrl: any;
		Category: {
			id: string;
			name: string;
		};
		Brand: {
			id: string;
			name: string;
		};
	};
	Project: {
		id: string;
		name: string;
		address: string;
	};
	User: {
		id: string;
		email: string;
		role: string;
		status: string;
		Profile: {
			first_name: string;
			last_name: string;
			position: any;
			address: any;
			contact: any;
			avatarUrl: any;
		};
	};
};
