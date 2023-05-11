export enum TRANSACTION_STATUS {
  WAITING = "WAITING",
  // ON_PROCESS = "ON_PROCESS",
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

export enum UNIT {
  UNIT = "UNIT",
  PCS = "PCS",
  // SETS = "SETS",
  // ROLL = "ROLL",
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum PROJECT_STATUS {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  // CANCELLED = "CANCELLED",
}

export enum ITEM_STATUS {
  AVAILABLE = "AVAILABLE",
  BORROWED = "BORROWED",
  DEFECTIVE = "DEFECTIVE",
}
