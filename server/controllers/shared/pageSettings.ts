import { Database, DatabaseService } from '../../utils/database.js';
import { Logger, LoggerService } from '../../utils/logger.js';
import { Common, CommonService } from '../../utils/common.js';
import { CollectionsEnum, PageSettings } from '../../models/database.model.js';

const logger: LoggerService = Logger;
const common: CommonService = Common;
const databaseService: DatabaseService = Database;

export const getPageSettings = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Page Settings', msg: 'Getting Page Settings..' });
  databaseService.find(req.session.selectedNode, CollectionsEnum.PAGE_SETTINGS).then((settings: PageSettings) => {
    logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Page Settings', msg: 'Page Settings Received', data: settings });
    res.status(200).json(settings);
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Page Settings', 'Page Settings Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};

export const savePageSettings = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Page Settings', msg: 'Saving Page Settings..' });
  return databaseService.insert(req.session.selectedNode, CollectionsEnum.PAGE_SETTINGS, req.updatedSettings).then((insertedSettings) => {
    logger.log({ level: 'DEBUG', fileName: 'Page Settings', msg: 'Page Settings Updated', data: insertedSettings });
    return res.status(201).json(true);
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Page Settings', 'Page Settings Update Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};
