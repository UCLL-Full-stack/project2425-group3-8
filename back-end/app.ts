import * as dotenv from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { eventRouter } from './controller/event.routes';
import { userRouter } from './controller/user.routes';
import express, { Request, Response, NextFunction } from 'express';
import matchesRouter from './controller/matches.routes';
import playerRouter from './controller/player.routes';
import VistorRouter from './controller/visitor.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    connectSrc: ["'self'", 'https://api.ucll.be'],
  }
})
)

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
    expressjwt({
      secret: process.env.JWT_SECRET || 'default_secret',
      algorithms: ['HS256'],
    }).unless({
      path: [
        '/api-docs/',
        '/user/login',
        '/event',
        '/player',
        '/user/register',
        /^\/matches\/\d+\/[A-Za-z]+$/,
        '/matches',
        '/status',
        /\/swagger-ui.*/,
        /\/swagger.*\.json$/,
      ],
    })
  );
app.use('/event', eventRouter)
app.use('/user', userRouter)
app.use('/matches', matchesRouter)
app.use('/player', playerRouter)
app.use('/visitor', VistorRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

  const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs/#/default`);
  });
