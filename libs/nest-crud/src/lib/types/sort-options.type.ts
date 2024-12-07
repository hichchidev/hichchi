/* eslint-disable @typescript-eslint/no-explicit-any */
import { FindOptionsOrder } from "typeorm";

export type SortOptions<Entity = any> = FindOptionsOrder<Entity>;
