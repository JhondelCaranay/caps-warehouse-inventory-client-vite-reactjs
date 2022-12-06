export enum TRANSACTION_STATUS {
	WAITING = "WAITING",
	ON_PROCESS = "ON_PROCESS",
	ON_DELIVERY = "ON_DELIVERY",
	CONFIRMED_RECEIVED = "CONFIRMED_RECEIVED",
	ON_RETURN = "ON_RETURN",
	CONFIRMED_RETURNED = "CONFIRMED_RETURNED",
}

export enum ROLES {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	WAREHOUSE_CONTROLLER = "WAREHOUSE_CONTROLLER",
	ENGINEER = "ENGINEER",
}