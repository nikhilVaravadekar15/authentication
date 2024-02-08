import { Request, Response } from "express"

class TestController {

    async test(request: Request, response: Response) {

        try {

            const query: string = request.query["q"] as string
            if (query) {
                return response.status(200).json({
                    "message": `Hello ${query}! 😇`
                })
            } else {
                return response.status(200).json({
                    "message": `Hello world! 😀`
                })
            }
        }
        catch (error: any) {
            return response.status(500).json({
                "message": "Something went wrong, please try again."
            })
        }

    }


}

export default new TestController()
