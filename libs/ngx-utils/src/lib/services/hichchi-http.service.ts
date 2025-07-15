import { HttpClient } from "@angular/common/http";

export abstract class HichchiHttpService {
    protected constructor(private readonly http: HttpClient) {}
}
