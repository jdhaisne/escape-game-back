import { IValidationRule } from "../interfaces/IValidation";

export function validate(rules: IValidationRule[]): string | null {
    const failedRule = rules.find((rule) => !rule.condition);
    return failedRule ? failedRule.message : null;
}