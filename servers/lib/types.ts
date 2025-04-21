import { Request, ResponseToolkit, Lifecycle } from '@hapi/hapi';

/**
 * Represents the signature of an HTTP method handler in Hapi.
 */
export type HapiHTTPMethodHandler = (request: Request, responseToolkit: ResponseToolkit) => Lifecycle.ReturnValue;
