import { Request, Response } from "express"


class TestController {

    async test(request: Request, response: Response) {

        try {
            const query: string = request.query["q"] as string
            if (query) {
                return response.status(200).json({
                    "timestamp": new Date().toISOString(),
                    "status": 200,
                    "error": "",
                    "message": `Hello ${query}! 😇`,
                    "path": `${request.route.path}`
                })
            } else {
                return response.status(200).json({
                    "timestamp": new Date().toISOString(),
                    "status": 200,
                    "error": "",
                    "message": `Hello world! 😀`,
                    "path": `${request.route.path}`
                })
            }
        }
        catch (error: any) {
            return response.status(500).json({
                "timestamp": new Date().toISOString(),
                "status": 500,
                "error": `${error.toString()}`,
                "message": "Something went wrong, please try again.",
                "path": `${request.route.path}`
            })
        }

    }

    async notFound(request: Request, response: Response) {

        return response.status(404).json({
            "timestamp": new Date().toISOString(),
            "status": 404,
            "error": "Not found",
            "message": "Sorry, we couldn't find the resources you're looking for.",
            "path": `${request.route.path}`
        })

    }

}

export default new TestController()
