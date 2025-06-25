import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoggerService } from "@hichchi/nest-core";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        LoggerService.error(new Error("Error message"), {
            message: "Error message long one",
            context: this.constructor.name,
        });
    }

    @Get()
    getData(): { message: string } {
        return this.appService.getData();
    }
}
