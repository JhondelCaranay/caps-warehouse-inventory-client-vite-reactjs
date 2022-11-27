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
