import { Type } from "@nestjs/common";
import { NestParamDecorator } from "../enums";

export type RouteArgsMetadataKey = `${NestParamDecorator.Body}:${number}`;

export interface INestController {
    token: Type;
}

export interface INestModule {
    _controllers?: Map<string, INestController>;
}

export interface INestContainer {
    modules?: Map<string, INestModule>;
}

export interface INestApp {
    container?: INestContainer;
}

export interface RouterMetadata {
    index: number;
}

export interface RouteArgsMetadata {
    [p: RouteArgsMetadataKey]: RouterMetadata;
}
