import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { userController } from "./controller/UserController";
import { User } from "./entity/User";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes
    app.get("/users", userController.all);

    app.get("/users/:id", userController.one);

    app.post("/users", userController.save);

    app.delete("/users", userController.remove);

    // setup express app here
    // ...

    // start express server
    app.listen(3000, () => {
        console.log("Express server has started on port 3000.");
    });

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));

    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

}).catch(error => console.log(error));
