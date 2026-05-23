import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
