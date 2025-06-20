import { ValidationErrors } from "../responses";

export type ValidationConstraint = keyof typeof ValidationErrors;
