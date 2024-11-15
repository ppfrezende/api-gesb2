import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createTimeSheetData } from './timesheet-data/create-timesheet-data';
import { deleteTimeSheet } from './timesheet-data/delete-timesheet-data';
import { getTimeSheetDataList } from './timesheet-data/get-timesheetdata-list';
import { getTimeSheetDataListByTechId } from './timesheet-data/get-timesheet-data-list-by-tech-id';
import { getTimeSheet } from './timesheet-data/get-timesheet-data';
import { connectTimesheetToIntervention } from './timesheet-data/connect-timesheet-to-internvetion';
import { disconnectTimesheetToIntervention } from './timesheet-data/disconnect-timesheet-to-intervention';

export async function timeSheetsRoutes(app: FastifyInstance) {
  app.post(
    '/technicians/:technicianId/timesheet',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createTimeSheetData,
  );

  app.get(
    '/timesheet',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getTimeSheetDataList,
  );

  app.get(
    '/timesheet/data/:timesheetdataId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getTimeSheet,
  );

  app.get(
    '/timesheet/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getTimeSheetDataListByTechId,
  );

  app.delete(
    '/timesheet/:timesheetdataId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteTimeSheet,
  );

  app.put(
    '/timesheet/:timesheetdataId/connect/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    connectTimesheetToIntervention,
  );
  app.delete(
    '/timesheet/:timesheetdataId/disconnect/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    disconnectTimesheetToIntervention,
  );
}
