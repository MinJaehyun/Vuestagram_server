import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './api-spec.json';
// import swaggerDocument from './api-spec.json' assert {type: "json"};
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jsonFile = require('./api-spec.json');
import { Router } from 'express';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(jsonFile));

export default router;
