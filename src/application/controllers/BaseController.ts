export abstract class BaseController {
    public static jsonResponse (res: any, code: number, message: string) {
      return res.status(code).json({ message })
    }
  
    public ok<T> (res: any, dto?: T) {
        if (!!dto) {
        return res.status(200).json(dto);
        } else {
        return res.sendStatus(200);
        }
    }

    public failed (res: any, error: Error | any) {
        console.log(error);
        return res.status(400).json({
            message: error.toString()
        })
    }
  
    public created (res: any) {
        return res.sendStatus(201);
    }
  
    public unauthorized (res: any, message?: string) {
        return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }
    
    public forbidden (res: any, message?: string) {
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    }
    
    public notFound (res: any, message?: string) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }
}