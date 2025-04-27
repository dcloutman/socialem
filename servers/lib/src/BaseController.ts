import { Server, Request, ResponseToolkit, Lifecycle, RouteDefMethods } from '@hapi/hapi';
import { HapiHTTPMethodHandler } from './types.js';

/**
 * BaseController is a base class for defining HTTP route handlers.
 * It provides default implementations for common HTTP methods (GET, POST, PUT, DELETE),
 * which can be overridden by derived classes. This class is intended to be extended.
 */
export class BaseController {
    /**
     * The Hapi server instance.
     */
    protected server: Server;

    /**
     * The base path for all routes in this controller. Must start with a '/'.
     * If the provided basePath does not start with a '/', it will be automatically corrected
     * at runtime, but a warning will be emmited.
     */
    protected basePath: string;

    /**
     * Constructs a new BaseController instance.
     * @param server - The Hapi server instance.
     * @param basePath - The base path for all routes in this controller.
     */
    constructor(server: Server, basePath: string) {
        this.server = server;

        // Ensure the basePath starts with a '/'
        if (!basePath.startsWith('/')) {
            console.warn(
                `Warning: The basePath "${basePath}" does not start with a '/'. It has been automatically corrected to "/${basePath}".`
            );
            this.basePath = `/${basePath}`;
        } else {
            this.basePath = basePath;
        }

        // Automatically register HTTP methods
        this.registerRoutes();
    }

    /**
     * Default behavior for the GET HTTP method.
     * Override this method in a derived class to provide custom behavior.
     * @param request - The Hapi request object.
     * @param responseToolkit - The Hapi response toolkit.
     * @returns A Hapi Lifecycle.ReturnValue.
     */
    public get(request: Request, responseToolkit: ResponseToolkit): Lifecycle.ReturnValue {
        return this._notImplemented(request, responseToolkit, 'GET');
    }

    /**
     * Default behavior for the POST HTTP method.
     * Override this method in a derived class to provide custom behavior.
     * @param request - The Hapi request object.
     * @param responseToolkit - The Hapi response toolkit.
     * @returns A Hapi Lifecycle.ReturnValue.
     */
    public post(request: Request, responseToolkit: ResponseToolkit): Lifecycle.ReturnValue {
        return this._notImplemented(request, responseToolkit, 'POST');
    }

    /**
     * Default behavior for the PUT HTTP method.
     * Override this method in a derived class to provide custom behavior.
     * @param request - The Hapi request object.
     * @param responseToolkit - The Hapi response toolkit.
     * @returns A Hapi Lifecycle.ReturnValue.
     */
    public put(request: Request, responseToolkit: ResponseToolkit): Lifecycle.ReturnValue {
        return this._notImplemented(request, responseToolkit, 'PUT');
    }

    /**
     * Default behavior for the DELETE HTTP method.
     * Override this method in a derived class to provide custom behavior.
     * @param request - The Hapi request object.
     * @param responseToolkit - The Hapi response toolkit.
     * @returns A Hapi Lifecycle.ReturnValue.
     */
    public delete(request: Request, responseToolkit: ResponseToolkit): Lifecycle.ReturnValue {
        return this._notImplemented(request, responseToolkit, 'DELETE');
    }

    /**
     * Helper method for unimplemented HTTP methods.
     * This method is used to return a 501 Not Implemented response.
     * @param request - The Hapi request object.
     * @param responseToolkit - The Hapi response toolkit.
     * @param method - The HTTP method that is not implemented.
     * @returns A Hapi Lifecycle.ReturnValue.
     */
    private _notImplemented(request: Request, responseToolkit: ResponseToolkit, method: string): Lifecycle.ReturnValue {
        return responseToolkit.response({
            error: `${method} not implemented`
        }).code(501); 
    }

    /**
     * Registers routes for the HTTP methods defined in this controller.
     * This method dynamically maps HTTP methods (GET, POST, PUT, DELETE) to their corresponding class methods.
     */
    private registerRoutes(): void {
        // Define the HTTP methods to be registered
        const httpMethods: readonly string[] = ['GET', 'POST', 'PUT', 'DELETE'];
        for (const httpMethod of httpMethods) {
            const classMethod = httpMethod.toLowerCase() as keyof this;

            // Check if the class method is implemented in the derived class
            if (typeof (this as any)[classMethod] === 'function') {
                this.server.route({
                    method: httpMethod as RouteDefMethods, // Correct type from Hapi's definitions
                    path: this.basePath,
                    handler: (this as any)[classMethod] as HapiHTTPMethodHandler, // Enforce the handler signature
                });
            }
        }
    }
}
