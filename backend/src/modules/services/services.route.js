import { Router } from "express";
import servicesController from './services.controller.js';

const router = Router();

router.get('/getServicesList',servicesController.getServicesList);
router.get('/getServicesListbyName',servicesController.getServiceListbyName);
router.post('/createNewService',servicesController.createNewService);



export default router;