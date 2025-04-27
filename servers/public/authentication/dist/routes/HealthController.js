import { BaseController } from '@socialem/server-lib';
export class HealthController extends BaseController {
    constructor(server) {
        // Call the BaseController constructor
        super(server, "/health");
    }
    // Override the GET method to define the /health route logic
    get(request, responseToolkit) {
        return responseToolkit.response({
            status: 'ok',
            service: 'authentication',
            timestamp: new Date().toISOString(),
        }).code(200);
    }
}
