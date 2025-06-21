import { User, UserSession } from "@hichchi/nest-connector/auth";
import { UserExtra } from "./user-extra.interfaces";

export interface TokenUser extends User, UserExtra, UserSession {}
