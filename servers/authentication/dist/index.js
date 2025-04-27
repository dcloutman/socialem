import Hapi from '@hapi/hapi';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'; // Import this to resolve paths in ESM
import { BaseController } from '@socialem/server-lib';
process.stdout.write('File execution started.\n');
console.log('Starting server...');
// Resolve __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Determine if we're running compiled code
const isCompiled = __filename.endsWith('.js');
const fileExtension = isCompiled ? '.js' : '.ts';
console.log({ isCompiled, fileExtension });
const init = async () => {
    console.log('Initializing server...');
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });
    // Dynamically load all controllers from the routes directory
    const routesDir = path.join(__dirname, 'routes');
    console.log('Looking for controllers in:', routesDir);
    const files = await fs.promises.readdir(routesDir);
    console.log('Found files:', files);
    for (const file of files) {
        console.log('Processing file:', file);
        if (file.endsWith(fileExtension)) {
            let modulePath;
            if (isCompiled) {
                // Append the correct extension for compiled files
                modulePath = `file://${path.join(routesDir, `${path.basename(file, path.extname(file))}${fileExtension}`)}`;
            }
            else {
                // Use the original file for development
                modulePath = `file://${path.join(routesDir, file)}`;
            }
            console.log('Checking if file exists:', modulePath);
            // Check if the file exists
            if (!fs.existsSync(modulePath.replace('file://', ''))) {
                console.warn(`File does not exist: ${modulePath}`);
                continue;
            }
            //try {
            const module = await import(modulePath);
            console.log('Successfully imported:', modulePath);
            const Controller = module.default || module[Object.keys(module)[0]];
            console.log('Controller loaded:', Controller.name);
            const expectedClassName = path.basename(file, fileExtension);
            if (typeof Controller === 'function' &&
                Controller.prototype instanceof BaseController &&
                expectedClassName.endsWith('Controller') &&
                Controller.name === expectedClassName) {
                new Controller(server);
                console.log('Controller instantiated:', Controller.name);
            }
            else {
                console.warn('Skipping file:', file);
            }
            //} catch (error) {
            //    console.error(`Failed to load controller from ${modulePath}:`, error);
            //}
        }
    }
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
init();
