import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createTimeSheetData } from './timesheet-data/create-timesheet-data';
import { deleteTimeSheet } from './timesheet-data/delete-timesheet-data';
import { getTimeSheetDataList } from './timesheet-data/get-timesheetdata-list';
import { getTimeSheetDataListByTechId } from './timesheet-data/get-timesheet-data-list-by-tech-id';

export async function timeSheetsRoutes(app: FastifyInstance) {
  app.post(
    '/technicians/:technicianId/timesheet',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    createTimeSheetData,
  );

  app.get(
    '/timesheet',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getTimeSheetDataList,
  );

  app.get(
    '/timesheet/:technicianId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getTimeSheetDataListByTechId,
  );

  app.delete(
    '/timesheet/:timesheetdataId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    deleteTimeSheet,
  );
}
