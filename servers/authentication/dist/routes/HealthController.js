import { BaseController } from '@server-lib/BaseController';
export class HealthController extends BaseController {
    constructor(server, path) {
        // Call the BaseController constructor
        super(server, path);
    }
    // Override the GET method to define the /health route logic
    get() {
        return (request, h) => {
            return h.response({
                status: 'ok',
                service: 'authentication',
                timestamp: new Date().toISOString(),
            }).code(200);
        };
    }
}
