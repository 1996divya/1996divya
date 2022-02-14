
// import express, {Request, Response, Router, Express} from 'express';
// import router from './route';
// import DBConnect from "./dbConfigs";
// import { RequestHandler } from 'express-serve-static-core';
// import init from "dewlinq";
// init();

// // call express
// const app: Express = express(); // define our app using express

// // configure app to use bodyParser for
// // Getting data from body of requests
// app.use(express.urlencoded({extended: true}) as RequestHandler);

// app.use(express.json() as RequestHandler) 


// const port: number = Number(process.env.PORT) || 8050; // set our port

// // connect to database. right now it's just working with mongodb
// // but in near future it will be configured for other databases as well
// DBConnect.dbConnection();

// // Send index.html on root request
// app.use(express.static('dist'));
// app.get('/', (req:Request, res:Response) => {
//     console.log('sending index.html');
//     res.sendFile('/dist/index.html');
// });

// // REGISTER ROUTES
// // all of the routes will be prefixed with /api
// const routes: Router[] = Object.values(router);
// app.use('/api', routes);

// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log(`App listening on ${port}`);
import express, { Router } from "express";
import  Routes  from "./route/routes/test";
//import mongoose from "mongoose";




export const app = express();

app.use(express.json());



const routes=new Routes(app);
routes.map();


app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

