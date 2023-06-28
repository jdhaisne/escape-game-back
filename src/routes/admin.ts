import express, { Router, Request, Response } from 'express';




const router: Router = express.Router();




// PUT /admin/rooms/:id: Update details of an existing room (admin only).
router.put('/rooms/:id:', async (req: Request, res: Response) => {
    // TODO
});

export { router as admin_routes };