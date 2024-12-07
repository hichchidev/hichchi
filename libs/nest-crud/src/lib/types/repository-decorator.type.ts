/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "../base";

export type RepositoryDecorator = <T extends { new (...args: any[]): BaseRepository<any> }>(target: T) => T | void;
