import Hapi from '@hapi/hapi';
import { HealthController } from './routes/HealthController';

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
    });

    // Register the HealthController
    new HealthController(server, '/health');

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();