export class BaseController {
    server;
    basePath;
    constructor(server, basePath) {
        this.server = server;
        this.basePath = basePath;
        // Automatically register HTTP methods
        this.registerRoutes();
    }
    // Default behavior for GET
    get(request, responseToolkit) {
        return this._notImplemented(request, responseToolkit, 'GET');
    }
    // Default behavior for POST
    post(request, responseToolkit) {
        return this._notImplemented(request, responseToolkit, 'POST');
    }
    // Default behavior for PUT
    put(request, responseToolkit) {
        return this._notImplemented(request, responseToolkit, 'PUT');
    }
    // Default behavior for DELETE
    delete(request, responseToolkit) {
        return this._notImplemented(request, responseToolkit, 'DELETE');
    }
    // Helper method for unimplemented methods
    _notImplemented(request, responseToolkit, method) {
        return responseToolkit.response({
            error: `${method} not implemented`
        }).code(501);
    }
    // Register routes for the HTTP methods
    registerRoutes() {
        const methods = ['get', 'post', 'put', 'delete'];
        for (let i = 0; i < methods.length; i++) {
            const methodName = methods[i];
            // Check if the method is implemented in the derived class
            if (typeof this[methodName] === 'function') {
                this.server.route({
                    method: methodName.toUpperCase(),
                    path: this.basePath,
                    handler: this[methodName], // Pass the function reference directly
                });
            }
        }
    }
}
