import { BaseController } from '@socialem/server-lib';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';

export class HealthController extends BaseController {
    constructor(server: Server) {
        // Call the BaseController constructor
        super(server, "/health");
    }

    // Override the GET method to define the /health route logic
    public get(request: Request, responseToolkit: ResponseToolkit) {
        return responseToolkit.response({
            status: 'ok',
            service: 'authentication',
            timestamp: new Date().toISOString(),
        }).code(200);
    }
}