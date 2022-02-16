// import {userInfo} from 'os';
// import router from '../router';
// import {Test} from '../../models';
// import {Request, Response} from "express";
// import {ITest} from "../../domain/ITest";
// import {IError} from '../../domain/IError';

// router.route('/test')
//     .get((req: Request, res: Response) => {
//         const {username}: {username: string} = userInfo();
//         if (!username) {
//             const error : IError = {
//                 status: 500,
//                 message: "Something bad happend!"
//             }
//             res.status(error.status).json(error);
//         }
//         res.json({username});
//     })
//     .post(async (req: Request, res: Response) => {
//         const {text}: { text: string } = req.body;
//         const Text: ITest = new Test({text});
//         try {
//             const savedText: ITest = await Text.save();
//             res.status(201).json(savedText);
//         } catch (e) {
//             const error: IError = {
//                 status: 500,
//                 message: "An error happened!"
//             }
//             console.error(e);
//             res.status(error.status).json({message: "An error happened"});
//         }
//     })
//     .put((req: Request, res: Response) => {
//         const {id, text}: {id: string, text: string} = req.body;
//         Test.updateOne({_id: id}, {text}, {}, (err, test) => {
//             if (err){
//                 const error: IError ={
//                     status: 500,
//                     message: "It can't be updated at this moment!"
//                 }
//                 console.error(err);
//                 res.status(error.status).json(error);
//             }
//             else res.status(200).json({_id: id, text, ...test});
//         })
//     })
//     .delete((req: Request, res: Response) => {
//         const {id}: {id: string} = req.body;
//         Test.deleteOne({_id: id}, {}, (err) => {
//             if (err){
//                 const error: IError = {
//                     status: 500,
//                     message: "Resource can't be deleted!"
//                 }
//                 console.error(err);
//                 res.status(error.status).json(error);
//             }
//             else res.status(200).json({_id: id, text: "deleted successfully"});
//         })
//     });

// export default router;

import express, { Router } from "express";
// import mongoose from "mongoose";
// import  {userModel}  from "./models";
import {User} from "../../module";
import {app}  from "../../index";
import {writeFileSync, readFileSync, existsSync} from "fs";
import {ObjectId} from 'mongodb';




  export default class Routes{
    public _id: ObjectId | null = new ObjectId();
    private app:any=null;
   

    public constructor(app:any){
      this.app=app;
    }
    public map(){
      app.post("/add_user",  (request, response) => {
        //const user = new userModel(request.body);
        try {
          console.log(request.body)
          if(!existsSync("mydb.json"))
            writeFileSync("mydb.json","[]",{encoding:"utf-8"});
          const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
          const users: User[] = JSON.parse(usersString);
          
         
            users.push({
            _id: this._id,
              building_name: request.body.building_name,
              level_name: request.body.level_name,
              area_name: request.body.area_name,
              component_name: request.body.component_name,
              component_brand:request.body.component_brand,
              parametri:request.body.parametri,
              activity:request.body.activity,

            });
        //   else { 
        //     const maxid=users[users.length-1]
        //     users.push({
        //       id:1+maxid,
        //       name: request.body.name,
        //       surname: request.body.surname,
        //       location: request.body.location,
        //       location_type: request.body.location_type,
        //     });

          
        //   }
          console.log(users)
          writeFileSync("mydb.json",JSON.stringify(users));
          response.status(201).send();
        } catch (error) {
          const err: any = error
          console.log(err.message);
          response.status(500).send(error);

      
        }
    });
    
    // app.get("/users/:name", async (request, response) => {
    //  //   const users = userModelfind({});
    //     const passedName = request.params.name;
    //     try {
    //       if(!existsSync("mydb.json"))
    //       writeFileSync("mydb.json","[]",{encoding:"utf-8"});
    //     const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
    //     const users: User[] = JSON.parse(usersString);
    //     const results=users.find(a=>a.name === passedName)
    //     response.status(200).send(results);

    //     } catch (error) {
    //       response.status(500).send(error);
    //     }
    //  });
    
    //   app.delete("/users/:id", async (request, response) => {
    //     try {
    //       const passedName = Number.parseInt(request.params.id);
    //       if(!existsSync("mydb.json"))
    //       writeFileSync("mydb.json","[]",{encoding:"utf-8"});
    //     const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
    //     const users: User[] = JSON.parse(usersString);
    //     const result=users.filter(x=>x.id !== passedName);
    //     writeFileSync("mydb.json",JSON.stringify(result));
    //     response.status(200).send();
    //     }
    //     catch(error){
    //       response.status(500).send(error);
    //     }
    //   });

      app.get("/users", async (request, response) => {
        try {
          if(!existsSync("mydb.json"))
          writeFileSync("mydb.json","[]",{encoding:"utf-8"});
        const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
        const users: User[] = JSON.parse(usersString);
        response.status(200).send(users);
        }catch(error){
          response.status(500).send(error);
        }
        }
      );

//       app.get("/users/find/:d", async (request, response) => {
//         //const a: string = "name";
//         const passedName = request.params.d;

//        // const ciao: string = "buongiorno";
//         //ciao.startsWith("c");
//         //ciao.startsWith("b");
//         try {
//           if(!existsSync("mydb.json"))
//           writeFileSync("mydb.json","[]",{encoding:"utf-8"});
//         const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
//         const users: User[] = JSON.parse(usersString);
//         const result=users.filter(x=>x.name.startsWith(passedName));
//         response.status(200).send(result);
//         }catch(error){
//           response.status(500).send(error);
//         }
//         }
//       );

      // app.patch("/users", async (request, response) => {
      //   const find = request.body;
      //    try {
      //     if(!existsSync("mydb.json"))
      //     writeFileSync("mydb.json","[]",{encoding:"utf-8"});
      //   const usersString = readFileSync("mydb.json",{encoding:"utf-8"});
      //   const users: User[] = JSON.parse(usersString);
      //   for (let i = 0; i < users.length; i++) {
      //     const element = users[i];
      //     if(element.building_name===find.building_name) {
            
      //       element.level_name=find.level_name;
      //       element.area_name=find.area_name;
      //       element.component_name=find.component_name;
      //       element.component_brand=find.component_brand
      //     }
          
      //   }
      //   writeFileSync("mydb.json",JSON.stringify(users));
      //   response.status(200).send(users);
      //   }catch(error){
      //     response.status(500).send(error);
      //   }
      //   });

      
      

   }
 }
  
function mydb(mydb: any) {
  throw new Error("Function not implemented.");
}

function async(request: any, response: any): import("express-serve-static-core").RequestHandler<{ find: string; } & { d: string; }, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error("Function not implemented.");
}


