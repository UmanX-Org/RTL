import request from 'request-promise';
import { Logger, LoggerService } from '../../utils/logger.js';
import { Common, CommonService } from '../../utils/common.js';
import { SelectedNode } from '../../models/config.model.js';

let options = null;
const logger: LoggerService = Logger;
const common: CommonService = Common;

export const decodePaymentFromPaymentRequest = (selNode: SelectedNode, payment) => {
  options.url = selNode.settings.lnServerUrl + '/v1/payreq/' + payment;
  return request(options).then((res) => {
    logger.log({ selectedNode: selNode, level: 'DEBUG', fileName: 'PayReq', msg: 'Description Received', data: res.description });
    return res;
  }).catch((err) => { });
};

export const decodePayment = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'PayRequest', msg: 'Decoding Payment..' });
  options = common.getOptions(req);
  if (options.error) { return res.status(options.statusCode).json({ message: options.message, error: options.error }); }
  options.url = req.session.selectedNode.settings.lnServerUrl + '/v1/payreq/' + req.params.payRequest;
  request(options).then((body) => {
    logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'PayRequest', msg: 'Payment Decoded', data: body });
    res.status(200).json(body);
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'PayRequest', 'Decode Payment Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};

export const decodePayments = (req, res, next) => {
  const { payments } = req.body;
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'PayRequest', msg: 'Decoding Payments List..' });
  options = common.getOptions(req);
  if (options.error) { return res.status(options.statusCode).json({ message: options.message, error: options.error }); }
  if (payments) {
    const paymentsArr = payments.split(',');
    return Promise.all(paymentsArr?.map((payment) => decodePaymentFromPaymentRequest(req.session.selectedNode, payment))).
      then((values) => {
        logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'PayRequest', msg: 'Payment List Decoded', data: values });
        res.status(200).json(values);
      }).
      catch((errRes) => {
        const err = common.handleError(errRes, 'PayRequest', 'Decode Payments Error', req.session.selectedNode);
        return res.status(err.statusCode).json({ message: err.message, error: err.error });
      });
  } else {
    logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'PayRequest', msg: 'Empty Payment List Decoded' });
    return res.status(200).json([]);
  }
};

export const getPayments = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Getting Payments List..' });
  options = common.getOptions(req);
  if (options.error) { return res.status(options.statusCode).json({ message: options.message, error: options.error }); }
  options.url = req.session.selectedNode.settings.lnServerUrl + '/v1/payments?max_payments=' + req.query.max_payments + '&index_offset=' + req.query.index_offset + '&reversed=' + req.query.reversed;
  request(options).then((body) => {
    logger.log({ selectedNode: req.session.selectedNode, level: 'DEBUG', fileName: 'Payments', msg: 'Payment List Received', data: body });
    res.status(200).json(body);
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Payments', 'List Payments Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};

export const getAllLightningTransactions = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Getting All Lightning Transactions..' });
  const options1 = JSON.parse(JSON.stringify(common.getOptions(req)));
  const options2 = JSON.parse(JSON.stringify(common.getOptions(req)));
  // options1.url = req.session.selectedNode.settings.lnServerUrl + '/v1/payments?max_payments=100000&index_offset=0&reversed=true';
  options2.url = req.session.selectedNode.settings.lnServerUrl + '/v1/invoices?num_max_invoices=100000&index_offset=0&reversed=true';
  logger.log({ selectedNode: req.session.selectedNode, level: 'DEBUG', fileName: 'Payments', msg: 'All Payments Options', data: options1 });
  logger.log({ selectedNode: req.session.selectedNode, level: 'DEBUG', fileName: 'Payments', msg: 'All Invoices Options', data: options2 });
  // return Promise.all([request(options1), request(options2)]).then((values) => {
  return Promise.all([{ payments: [] }, request(options2)]).then((values) => {
    logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'All Lightning Transactions Received', data: ({ totalPayments: values[0].payments.length || 0, totalInvoices: values[1].invoices.length || 0 }) });
    res.status(200).json({ listPaymentsAll: values[0], listInvoicesAll: values[1] });
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Payments', 'All Lightning Transactions Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};

export const paymentLookup = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Looking up Payment..' });
  options = common.getOptions(req);
  if (options.error) { return res.status(options.statusCode).json({ message: options.message, error: options.error }); }
  options.url = req.session.selectedNode.settings.lnServerUrl + '/v2/router/track/' + req.params.paymentHash;
  request(options).then((body) => {
    logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Payment Information Received for ' + req.params.paymentHash, data: body });
    res.status(200).json(body.result || body);
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Payments', 'Payment Lookup Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};

export const sendPayment = (req, res, next) => {
  logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Sending Payment..' });
  options = common.getOptions(req);
  if (options.error) { return res.status(options.statusCode).json({ message: options.message, error: options.error }); }
  options.url = req.session.selectedNode.settings.lnServerUrl + '/v2/router/send';
  if (req.body.last_hop_pubkey) {
    req.body.last_hop_pubkey = Buffer.from(req.body.last_hop_pubkey, 'hex').toString('base64');
  }
  req.body.amp = req.body.amp ?? false;
  req.body.timeout_seconds = req.body.timeout_seconds || 600;
  options.form = JSON.stringify(req.body);
  logger.log({ selectedNode: req.session.selectedNode, level: 'DEBUG', fileName: 'Payments', msg: 'Send Payment Options', data: options.form });
  request.post(options).then((body) => {
    const results = body.split('\n').filter(Boolean).map((jsonString) => JSON.parse(jsonString));
    body = results.length > 0 ? results[results.length - 1] : { result: { status: 'UNKNOWN' } };
    if (body.result.status === 'FAILED') {
      const err = common.handleError(common.titleCase(body.result.failure_reason.replace(/_/g, ' ').replace('FAILURE REASON ', '')), 'Payments', 'Send Payment Error', req.session.selectedNode);
      return res.status(err.statusCode).json({ message: err.message, error: err.error });
    }
    if (body.result.status === 'SUCCEEDED') {
      logger.log({ selectedNode: req.session.selectedNode, level: 'INFO', fileName: 'Payments', msg: 'Payment Sent', data: body.result });
      res.status(201).json(body.result);
    }
  }).catch((errRes) => {
    const err = common.handleError(errRes, 'Payments', 'Send Payment Error', req.session.selectedNode);
    return res.status(err.statusCode).json({ message: err.message, error: err.error });
  });
};
