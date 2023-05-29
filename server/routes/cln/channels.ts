import exprs from 'express';
const { Router } = exprs;
import { isAuthenticated } from '../../utils/authCheck.js';
import { listChannels, listPeerChannels, openChannel, setChannelFee, closeChannel, getLocalRemoteBalance, listForwards, funderUpdatePolicy, listForwardsPaginated } from '../../controllers/cln/channels.js';

const router = Router();

router.get('/listChannels', isAuthenticated, listChannels);
router.get('/listPeerChannels', isAuthenticated, listPeerChannels);
router.post('/', isAuthenticated, openChannel);
router.post('/setChannelFee', isAuthenticated, setChannelFee);
router.delete('/:channelId', isAuthenticated, closeChannel);

router.get('/localRemoteBalance', isAuthenticated, getLocalRemoteBalance);
router.get('/listForwards', isAuthenticated, listForwards);
router.get('/listForwardsPaginated', isAuthenticated, listForwardsPaginated);

router.post('/funderUpdate', isAuthenticated, funderUpdatePolicy);

export default router;
