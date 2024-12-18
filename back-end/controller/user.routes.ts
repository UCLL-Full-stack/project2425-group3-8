/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         fullName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 */
import express, { NextFunction, Request, Response } from "express";
import userService from "../service/user.service";
import { UserInput } from "../types";
import adminService from "../service/admin.service";

const userRouter = express.Router()
/**
 * @swagger
 * /user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user by email
 *     description: Get user by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 */

userRouter.post('/', async (req: Request, res: Response) => {
    try{
        try{
            const userInput: UserInput = req.body;
            const result1 = await userService.getUserByEmail(userInput);
            const role = await userService.getRole(userInput)
            
            res.status(200).json({result1, role, id: result1.getId()})
        } catch(error){
            throw error
        }
    }catch(error){
        if (error instanceof Error) {
            console.log(error.message); // Now TypeScript is happy
            res.status(400).json({ message: error.message });
        } else {
            console.log("An unknown error occurred", error);
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
})

/**
 * @swagger
 * /user/login:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   summary: Authenticate user
 *   description: Authenticate user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    200:
 *     description: User authenticated
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         id:
 *          type: integer
 *         fullName:
 *          type: string
 *         phoneNumber:
 *          type: string
 *         email:
 *          type: string
 *         password:
 *          type: string
 *         role:
 *          type: string
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json( response )
    } catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /user/register:
 *  post:
 *   security:
 *    - bearerAuth: [] 
 *   summary: Register user
 *   description: Register user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        fullName:
 *         type: string
 *        phoneNumber:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *        role:
 *         type: string
 *   responses:
 *    200:
 *     description: User registered
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         id:
 *          type: integer
 *         fullName:
 *          type: string
 *         phoneNumber:
 *          type: string
 *         email:
 *          type: string
 *         password:
 *          type: string
 *         role:
 *          type: string
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userInput = <UserInput>req.body;
        const response = await userService.register(userInput);
        console.log(response)
        res.status(200).json( response )
    } catch (error){
        next(error)
    }
})

/**
 * @swagger
 * /user/email/{email}:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   summary: Get user by email
 *   description: Get user by email
 *   parameters:
 *    - in: path
 *      name: email
 *      schema:
 *       type: string
 *      required: true
 *      description: Email of the user
 *   responses:
 *    200:
 *     description: User found
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         id:
 *          type: integer
 *         fullName:
 *          type: string
 *         phoneNumber:
 *          type: string
 *         email:
 *          type: string
 *         password:
 *          type: string
 *         role:
 *          type: string
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.params.email
        const response = await userService.getUserByJustEmail(email);
        res.status(200).json( response )
    } catch (error){
        next(error)
    }
}
)

/**
 * @swagger
 * /user/all:
 *  get:
 *   security:
 *    - bearerAuth: []
 *   summary: Get all users
 *   description: Get all users
 *   responses:
 *    200:
 *     description: Users found
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 */
userRouter.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const response = await userService.getUsers();
        res.status(200).json( response )
    } catch (error){
        next(error)
    }
})

export { userRouter }

