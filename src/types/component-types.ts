export type ComponentProps = {
	[key: string]: any;
};

export type SidebarToggleType = {
	toggleSidebar: boolean;
	setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NavbarProps = SidebarToggleType & {
	any?: any;
};

export type SidebarProps = SidebarToggleType & {};

export type WidgetTypes = "user" | "product" | "project" | "transaction";

export type WidgetProps = {
	type: WidgetTypes;
};

export type ChartProps = {
	aspect: number;
	title: string;
};
