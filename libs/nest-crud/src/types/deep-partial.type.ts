import { Primitive } from "@hichchi/nest-connector/crud";
import { FindOperator } from "typeorm";

/**
 * Query-safe deep partial type for dynamic search/filter payloads.
 */
export type QueryDeepPartial<T extends { [P in keyof T]: unknown } = object> = {
    [P in keyof T]?: T[P] extends Date // forbid Date
        ? never
        : T[P] extends (infer U)[]
          ? U extends object
              ? never // Disallow arrays of objects
              : T[P] // Allow array of primitives
          : T[P] extends Primitive
            ? T[P] | T[P][] | FindOperator<T[P]> // Allow primitive or primitive[]
            : QueryDeepPartial<T[P]>; // Allow Nested Obj or Partial nested Obj
};
