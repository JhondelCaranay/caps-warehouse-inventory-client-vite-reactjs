import _ from "lodash";

export const Capitalize = (str: string) => {
	return _.startCase(_.toLower(str));
};
