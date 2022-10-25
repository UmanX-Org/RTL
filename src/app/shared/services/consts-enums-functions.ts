import { MatPaginatorIntl } from '@angular/material/paginator';
import { PageSettings } from '../models/pageSettings';

export function getPaginatorLabel(field: string) {
  const appPaginator = new MatPaginatorIntl();
  appPaginator.itemsPerPageLabel = field + ' per page:';
  return appPaginator;
}

export const CURRENCY_UNITS = ['Sats', 'BTC'];
export const CURRENCY_UNIT_FORMATS = { Sats: '1.0-0', BTC: '1.6-6', OTHER: '1.2-2' };
export const FIAT_CURRENCY_UNITS = [
  { id: 'USD', name: 'USD' },
  { id: 'AUD', name: 'AUD' }, { id: 'BRL', name: 'BRL' }, { id: 'CAD', name: 'CAD' },
  { id: 'CHF', name: 'CHF' }, { id: 'CLP', name: 'CLP' }, { id: 'CNY', name: 'CNY' },
  { id: 'DKK', name: 'DKK' }, { id: 'EUR', name: 'EUR' }, { id: 'GBP', name: 'GBP' },
  { id: 'HKD', name: 'HKD' }, { id: 'INR', name: 'INR' }, { id: 'ISK', name: 'ISK' },
  { id: 'JPY', name: 'JPY' }, { id: 'KRW', name: 'KRW' }, { id: 'NZD', name: 'NZD' },
  { id: 'PLN', name: 'PLN' }, { id: 'RUB', name: 'RUB' }, { id: 'SEK', name: 'SEK' },
  { id: 'SGD', name: 'SGD' }, { id: 'THB', name: 'THB' }, { id: 'TWD', name: 'TWD' }
];

export const TIME_UNITS = ['SECS', 'MINS', 'HOURS', 'DAYS'];

export const PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 100];

export const ADDRESS_TYPES = [
  { addressId: '0', addressCode: 'bech32', addressTp: 'Bech32 (P2WKH)', addressDetails: 'Pay to witness key hash' },
  { addressId: '1', addressCode: 'p2sh-segwit', addressTp: 'P2SH (NP2WKH)', addressDetails: 'Pay to nested witness key hash (default)' },
  { addressId: '4', addressCode: 'p2tr', addressTp: 'Taproot (P2TR)', addressDetails: 'Pay to taproot pubkey' }
];

export const TRANS_TYPES = [
  { id: '0', name: 'Priority (Default)' },
  { id: '1', name: 'Target Confirmation Blocks' },
  { id: '2', name: 'Fee' }
];

export const FEE_LIMIT_TYPES = [
  { id: 'none', name: 'No Fee Limit', placeholder: 'No Limit' },
  { id: 'fixed', name: 'Fixed Limit (Sats)', placeholder: 'Fixed Limit in Sats' },
  { id: 'percent', name: 'Percentage of Payment Amount', placeholder: 'Percentage Limit' }
];

export const FEE_RATE_TYPES = [
  { feeRateId: 'urgent', feeRateType: 'Urgent' },
  { feeRateId: 'normal', feeRateType: 'Normal' },
  { feeRateId: 'slow', feeRateType: 'Slow' },
  { feeRateId: 'customperkb', feeRateType: 'Custom (Sats/vByte)' }
];

export const NODE_SETTINGS = {
  themes: [
    { id: 'PURPLE', name: 'Diogo' },
    { id: 'TEAL', name: 'My2Sats' },
    { id: 'INDIGO', name: 'RTL' },
    { id: 'PINK', name: 'BK' },
    { id: 'YELLOW', name: 'Gold' }
  ],
  modes: [{ id: 'DAY', name: 'Day' }, { id: 'NIGHT', name: 'Night' }]
};

export enum ECLWSEventTypeEnum {
  PAYMENT_RECEIVED = 'payment-received',
  PAYMENT_RELAYED = 'payment-relayed',
  PAYMENT_SENT = 'payment-sent',
  PAYMENT_SETTLING_ONCHAIN = 'payment-settling-onchain',
  PAYMENT_FAILED = 'payment-failed',
  CHANNEL_OPENED = 'channel-opened',
  CHANNEL_STATE_CHANGED = 'channel-state-changed',
  CHANNEL_CLOSED = 'channel-closed'
}

export enum CLNWSEventTypeEnum {
  INVOICE = 'invoice',
  BLOCK_HEIGHT = 'block-height',
  SEND_PAYMENT = 'send-payment'
}

export enum LNDWSEventTypeEnum {
  INVOICE = 'invoice'
}

export enum UserPersonaEnum {
  OPERATOR = 'OPERATOR',
  MERCHANT = 'MERCHANT',
  ALL = 'ALL'
}

export enum AlertTypeEnum {
  INFORMATION = 'Information',
  WARNING = 'Warning',
  ERROR = 'Error',
  SUCCESS = 'Success',
  CONFIRM = 'Confirm'
}

export enum AuthenticateWith {
  JWT = 'JWT',
  PASSWORD = 'PASSWORD'
}

export enum TimeUnitEnum {
  SECS = 'SECS',
  MINS = 'MINS',
  HOURS = 'HOURS',
  DAYS = 'DAYS'
}

export enum CurrencyUnitEnum {
  SATS = 'Sats',
  BTC = 'BTC',
  OTHER = 'OTHER' // Fiat currency for conversion
}

export enum DataTypeEnum {
  ARRAY = 'ARRAY',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  PASSWORD = 'PASSWORD',
  DATE = 'DATE',
  DATE_TIME = 'DATE_TIME'
}

export enum ScreenSizeEnum {
  XS = 'XS', // < 600 => mobile handsets
  SM = 'SM', // 600 - 839 => tab portrait
  MD = 'MD', // 840 - 1239 => tab landscape & small laptops
  LG = 'LG', // 1240 - 1800 => small laptops
  XL = 'XL' // >1801 => big laptops
}

export const CHANNEL_CLOSURE_TYPE = {
  COOPERATIVE_CLOSE: { name: 'Co-operative Close', tooltip: 'Channel closed cooperatively' },
  LOCAL_FORCE_CLOSE: { name: 'Local Force Close', tooltip: 'Channel force-closed by the local node' },
  REMOTE_FORCE_CLOSE: { name: 'Remote Force Close', tooltip: 'Channel force-closed by the remote node' },
  BREACH_CLOSE: { name: 'Breach Close', tooltip: 'Remote node attempted to broadcast a prior revoked channel state' },
  FUNDING_CANCELED: { name: 'Funding Canceled', tooltip: 'Channel never fully opened' },
  ABANDONED: { name: 'Abandoned', tooltip: 'Channel abandoned by the local node' }
};

export const WALLET_ADDRESS_TYPE = {
  WITNESS_PUBKEY_HASH: { name: 'Witness Pubkey Hash', tooltip: '' },
  NESTED_PUBKEY_HASH: { name: 'Nested Pubkey Hash', tooltip: '' },
  UNUSED_WITNESS_PUBKEY_HASH: { name: 'Unused Witness Pubkey Hash', tooltip: '' },
  UNUSED_NESTED_PUBKEY_HASH: { name: 'Unused Nested Pubkey Hash', tooltip: '' }
};

export enum CLNFailReason {
  WIRE_INVALID_ONION_VERSION = 'Invalid Onion Version',
  WIRE_INVALID_ONION_HMAC = 'Invalid Onion HMAC',
  WIRE_INVALID_ONION_KEY = 'Invalid Onion Key',
  WIRE_TEMPORARY_CHANNEL_FAILURE = 'Temporary Channel Failure',
  WIRE_PERMANENT_CHANNEL_FAILURE = 'Permanent Channel Failure',
  WIRE_REQUIRED_CHANNEL_FEATURE_MISSING = 'Missing Required Channel Feature',
  WIRE_UNKNOWN_NEXT_PEER = 'Unknown Next Peer',
  WIRE_AMOUNT_BELOW_MINIMUM = 'Amount Below Minimum',
  WIRE_FEE_INSUFFICIENT = 'Insufficient Fee',
  WIRE_INCORRECT_CLTV_EXPIRY = 'Incorrect CLTV Expiry',
  WIRE_EXPIRY_TOO_FAR = 'Expiry Too Far',
  WIRE_EXPIRY_TOO_SOON = 'Expiry Too Soon',
  WIRE_CHANNEL_DISABLED = 'Channel Disabled',
  WIRE_INVALID_ONION_PAYLOAD = 'Invalid Onion Payload',
  WIRE_INVALID_REALM = 'Invalid Realm',
  WIRE_PERMANENT_NODE_FAILURE = 'Permanent Node Failure',
  WIRE_TEMPORARY_NODE_FAILURE = 'Temporary Node Failure',
  WIRE_REQUIRED_NODE_FEATURE_MISSING = 'Missing Required Node Feature',
  WIRE_INVALID_ONION_BLINDING = 'Invalid Onion Binding',
  WIRE_INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 'Incorrect or Unknow Payment Details',
  WIRE_MPP_TIMEOUT = 'MPP Timeout',
  WIRE_FINAL_INCORRECT_CLTV_EXPIRY = 'Incorrect CLTV Expiry',
  WIRE_FINAL_INCORRECT_HTLC_AMOUNT = 'Incorrect HTLC Amount'
}

export enum CLNChannelPendingState {
  CHANNELD_NORMAL = 'Active',
  OPENINGD = 'Opening',
  CHANNELD_AWAITING_LOCKIN = 'Pending Open',
  CHANNELD_SHUTTING_DOWN = 'Shutting Down',
  CLOSINGD_SIGEXCHANGE = 'Closing: Sig Exchange',
  CLOSINGD_COMPLETE = 'Closed',
  AWAITING_UNILATERAL = 'Awaiting Unilateral Close',
  FUNDING_SPEND_SEEN = 'Funding Spend Seen',
  ONCHAIN = 'Onchain',
  DUALOPEND_OPEN_INIT = 'Dual Open Initialized',
  DUALOPEND_AWAITING_LOCKIN = 'Dual Pending Open'
}

export enum LoopStateEnum {
  INITIATED = 'Initiated',
  PREIMAGE_REVEALED = 'Preimage Revealed',
  HTLC_PUBLISHED = 'HTLC Published',
  SUCCESS = 'Successful',
  FAILED = 'Failed',
  INVOICE_SETTLED = 'Invoice Settled'
}

export enum LoopTypeEnum {
  LOOP_OUT = 'LOOP_OUT',
  LOOP_IN = 'LOOP_IN'
}

export enum SwapTypeEnum {
  SWAP_OUT = 'SWAP_OUT',
  SWAP_IN = 'SWAP_IN'
}

export enum SwapStateEnum {
  'swap.created' = 'Swap Created',
  'swap.expired' = 'Swap Expired',
  'invoice.set' = 'Invoice Set',
  'invoice.paid' = 'Invoice Paid',
  'invoice.pending' = 'Invoice Pending',
  'invoice.settled' = 'Invoice Settled',
  'invoice.failedToPay' = 'Invoice Failed To Pay',
  'channel.created' = 'Channel Created',
  'transaction.failed' = 'Transaction Failed',
  'transaction.mempool' = 'Transaction Mempool',
  'transaction.claimed' = 'Transaction Claimed',
  'transaction.refunded' = 'Transaction Refunded',
  'transaction.confirmed' = 'Transaction Confirmed',
  'swap.refunded' = 'Swap Refunded',
  'swap.abandoned' = 'Swap Abandoned'
}

export const MONTHS = [
  { name: 'Jan', days: 31 },
  { name: 'Feb', days: 28 },
  { name: 'Mar', days: 31 },
  { name: 'Apr', days: 30 },
  { name: 'May', days: 31 },
  { name: 'Jun', days: 30 },
  { name: 'Jul', days: 31 },
  { name: 'Aug', days: 31 },
  { name: 'Sep', days: 30 },
  { name: 'Oct', days: 31 },
  { name: 'Nov', days: 30 },
  { name: 'Dec', days: 31 }
];

export const SCROLL_RANGES = ['MONTHLY', 'YEARLY'];

export enum ServicesEnum {
  LOOP = 'LOOP',
  BOLTZ = 'BOLTZ',
  OFFERS = 'OFFERS',
  PEERSWAP = 'PEERSWAP'
}

export const PASSWORD_BLACKLIST = ['password', 'changeme', 'moneyprintergobrrr'];

export enum APICallStatusEnum {
  UN_INITIATED = 'UN_INITIATED',
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export const UI_MESSAGES = {
  NO_SPINNER: 'No Spinner...',
  GET_NODE_INFO: 'Getting Node Information...',
  INITALIZE_NODE_DATA: 'Initializing Node Data...',
  GENERATE_NEW_ADDRESS: 'Getting New Address...',
  SEND_FUNDS: 'Sending Funds...',
  UPDATE_CHAN_POLICY: 'Updating Channel Policy...',
  GET_CHAN_POLICY: 'Fetching Channel Policy...',
  GET_REMOTE_POLICY: 'Fetching Remote Policy...',
  CLOSE_CHANNEL: 'Closing Channel...',
  FORCE_CLOSE_CHANNEL: 'Force Closing Channel...',
  OPEN_CHANNEL: 'Opening Channel...',
  CONNECT_PEER: 'Connecting Peer...',
  DISCONNECT_PEER: 'Disconnecting Peer...',
  ADD_INVOICE: 'Adding Invoice...',
  CREATE_INVOICE: 'Creating Invoice...',
  DELETE_INVOICE: 'Deleting Invoices...',
  DECODE_PAYMENT: 'Decoding Payment...',
  DECODE_OFFER: 'Decoding Offer...',
  DECODE_PAYMENTS: 'Decoding Payments...',
  FETCH_INVOICE: 'Fetching Invoice...',
  GET_SENT_PAYMENTS: 'Getting Sent Payments...',
  SEND_PAYMENT: 'Sending Payment...',
  SEND_KEYSEND: 'Sending Keysend Payment...',
  SEARCHING_NODE: 'Searching Node...',
  SEARCHING_CHANNEL: 'Searching Channel...',
  SEARCHING_INVOICE: 'Searching Invoice...',
  SEARCHING_PAYMENT: 'Searching Payment...',
  BACKUP_CHANNEL: 'Backup Channels...',
  VERIFY_CHANNEL: 'Verify Channel...',
  DOWNLOAD_BACKUP_FILE: 'Downloading Backup File...',
  RESTORE_CHANNEL: 'Restoring Channels...',
  GET_TERMS_QUOTES: 'Getting Terms and Quotes...',
  LABEL_UTXO: 'Labelling UTXO...',
  GET_NODE_ADDRESS: 'Getting Node Address...',
  GEN_SEED: 'Generating Seed...',
  INITIALIZE_WALLET: 'Initializing Wallet...',
  UNLOCK_WALLET: 'Unlocking Wallet...',
  WAIT_SYNC_NODE: 'Waiting for Node Sync...',
  UPDATE_BOLTZ_SETTINGS: 'Updating Boltz Service Settings...',
  UPDATE_LOOP_SETTINGS: 'Updating Loop Service Settings...',
  UPDATE_PEERSWAP_SETTINGS: 'Updating Peerswap Service Settings...',
  UPDATE_SETTING: 'Updating Setting...',
  UPDATE_UI_SETTINGS: 'Updating Settings...',
  UPDATE_NODE_SETTINGS: 'Updating Node Settings...',
  UPDATE_SELECTED_NODE: 'Updating Selected Node...',
  OPEN_CONFIG_FILE: 'Opening Config File...',
  GET_SERVICE_INFO: 'Getting Service Info...',
  GET_QUOTE: 'Getting Quotes...',
  UPDATE_DEFAULT_NODE_SETTING: 'Updating Defaule Node Settings...',
  GET_BOLTZ_SWAPS: 'Getting Boltz Swaps...',
  SIGN_MESSAGE: 'Signing Message...',
  VERIFY_MESSAGE: 'Verifying Message...',
  BUMP_FEE: 'Bumping Fee...',
  LEASE_UTXO: 'Leasing UTXO...',
  GET_LOOP_SWAPS: 'Getting List Swaps...',
  GET_FORWARDING_HISTORY: 'Getting Forwarding History...',
  GET_LOOKUP_DETAILS: 'Getting Lookup Details...',
  GET_RTL_CONFIG: 'Getting RTL Config...',
  VERIFY_TOKEN: 'Verify Token...',
  DISABLE_OFFER: 'Disabling Offer...',
  CREATE_OFFER: 'Creating Offer...',
  DELETE_OFFER_BOOKMARK: 'Deleting Bookmark...',
  GET_FUNDER_POLICY: 'Getting Or Updating Funder Policy...',
  GET_LIST_CONFIGS: 'Getting Configurations List...',
  LIST_NETWORK_NODES: 'Getting Network Nodes List...',
  GET_PAGE_SETTINGS: 'Getting Page Settings...',
  SET_PAGE_SETTINGS: 'Setting Page Settings...',
  UPDATE_PAGE_SETTINGS: 'Updating Page Layout...',
  LOG_OUT: 'Logging Out...'
};

export enum PaymentTypes {
  INVOICE = 'INVOICE',
  OFFER = 'OFFER',
  KEYSEND = 'KEYSEND'
}

export enum ReportBy {
  FEES = 'FEES',
  EVENTS = 'EVENTS'
}

export enum RTLActions {
  VOID = 'VOID',
  SET_API_URL_ECL = 'SET_API_URL_ECL',
  UPDATE_SELECTED_NODE_OPTIONS = 'UPDATE_SELECTED_NODE_OPTIONS',
  UPDATE_API_CALL_STATUS_ROOT = 'UPDATE_API_CALL_STATUS_ROOT',
  RESET_ROOT_STORE = 'RESET_ROOT_STORE',
  CLOSE_ALL_DIALOGS = 'CLOSE_ALL_DIALOGS',
  OPEN_SNACK_BAR = 'OPEN_SNACKBAR',
  OPEN_SPINNER = 'OPEN_SPINNER',
  CLOSE_SPINNER = 'CLOSE_SPINNER',
  OPEN_ALERT = 'OPEN_ALERT',
  CLOSE_ALERT = 'CLOSE_ALERT',
  OPEN_CONFIRMATION = 'OPEN_CONFIRMATION',
  CLOSE_CONFIRMATION = 'CLOSE_CONFIRMATION',
  SHOW_PUBKEY = 'SHOW_PUBKEY',
  FETCH_CONFIG = 'FETCH_CONFIG',
  SHOW_CONFIG = 'SHOW_CONFIG',
  FETCH_STORE = 'FETCH_STORE',
  SET_STORE = 'SET_STORE',
  FETCH_RTL_CONFIG = 'FETCH_RTL_CONFIG',
  SET_RTL_CONFIG = 'SET_RTL_CONFIG',
  SAVE_SSO = 'SAVE_SSO',
  SAVE_SETTINGS = 'SAVE_SETTINGS',
  TWO_FA_SAVE_SETTINGS = 'TWO_FA_SAVE_SETTINGS',
  SET_SELECTED_NODE = 'SET_SELECTED_NODE',
  UPDATE_ROOT_NODE_SETTINGS = 'UPDATE_ROOT_NODE_SETTINGS',
  UPDATE_SERVICE_SETTINGS = 'UPDATE_SERVICE_SETTINGS',
  SET_NODE_DATA = 'SET_NODE_DATA',
  IS_AUTHORIZED = 'IS_AUTHORIZED',
  IS_AUTHORIZED_RES = 'IS_AUTHORIZED_RES',
  LOGIN = 'LOGIN',
  VERIFY_TWO_FA = 'VERIFY_TWO_FA',
  LOGOUT = 'LOGOUT',
  RESET_PASSWORD = 'RESET_PASSWORD',
  RESET_PASSWORD_RES = 'RESET_PASSWORD_RES',
  FETCH_FILE = 'FETCH_FILE',
  SHOW_FILE = 'SHOW_FILE'
};

export enum LNDActions {
  RESET_LND_STORE = 'RESET_LND_STORE',
  UPDATE_API_CALL_STATUS_LND = 'UPDATE_API_CALL_STATUS_LND',
  SET_CHILD_NODE_SETTINGS_LND = 'SET_CHILD_NODE_SETTINGS_LND',
  FETCH_PAGE_SETTINGS_LND = 'FETCH_PAGE_SETTINGS_LND',
  SET_PAGE_SETTINGS_LND = 'SET_PAGE_SETTINGS_LND',
  SAVE_PAGE_SETTINGS_LND = 'SAVE_PAGE_SETTINGS_LND',
  FETCH_INFO_LND = 'FETCH_INFO_LND',
  SET_INFO_LND = 'SET_INFO_LND',
  FETCH_PEERS_LND = 'FETCH_PEERS_LND',
  SET_PEERS_LND = 'SET_PEERS_LND',
  SAVE_NEW_PEER_LND = 'SAVE_NEW_PEER_LND',
  NEWLY_ADDED_PEER_LND = 'NEWLY_ADDED_PEER_LND',
  DETACH_PEER_LND = 'DETACH_PEER_LND',
  REMOVE_PEER_LND = 'REMOVE_PEER_LND',
  SAVE_NEW_INVOICE_LND = 'SAVE_NEW_INVOICE_LND',
  NEWLY_SAVED_INVOICE_LND = 'NEWLY_SAVED_INVOICE_LND',
  ADD_INVOICE_LND = 'ADD_INVOICE_LND',
  FETCH_FEES_LND = 'FETCH_FEES_LND',
  SET_FEES_LND = 'SET_FEES_LND',
  FETCH_BLOCKCHAIN_BALANCE_LND = 'FETCH_BLOCKCHAIN_BALANCE_LND',
  SET_BLOCKCHAIN_BALANCE_LND = 'SET_BLOCKCHAIN_BALANCE_LND',
  FETCH_NETWORK_LND = 'FETCH_NETWORK_LND',
  SET_NETWORK_LND = 'SET_NETWORK_LND',
  FETCH_CHANNELS_LND = 'FETCH_CHANNELS_LND',
  FETCH_PENDING_CHANNELS_LND = 'FETCH_PENDING_CHANNELS_LND',
  FETCH_CLOSED_CHANNELS_LND = 'FETCH_CLOSED_CHANNELS_LND',
  SET_CHANNELS_LND = 'SET_CHANNELS_LND',
  SET_PENDING_CHANNELS_LND = 'SET_PENDING_CHANNELS_LND',
  SET_CLOSED_CHANNELS_LND = 'SET_CLOSED_CHANNELS_LND',
  UPDATE_CHANNEL_LND = 'UPDATE_CHANNEL_LND',
  SAVE_NEW_CHANNEL_LND = 'SAVE_NEW_CHANNEL_LND',
  CLOSE_CHANNEL_LND = 'CLOSE_CHANNEL_LND',
  REMOVE_CHANNEL_LND = 'REMOVE_CHANNEL_LND',
  BACKUP_CHANNELS_LND = 'BACKUP_CHANNELS_LND',
  VERIFY_CHANNEL_LND = 'VERIFY_CHANNEL_LND',
  BACKUP_CHANNELS_RES_LND = 'BACKUP_CHANNELS_RES_LND',
  VERIFY_CHANNEL_RES_LND = 'VERIFY_CHANNEL_RES_LND',
  RESTORE_CHANNELS_LIST_LND = 'RESTORE_CHANNELS_LIST_LND',
  SET_RESTORE_CHANNELS_LIST_LND = 'SET_RESTORE_CHANNELS_LIST_LND',
  RESTORE_CHANNELS_LND = 'RESTORE_CHANNELS_LND',
  RESTORE_CHANNELS_RES_LND = 'RESTORE_CHANNELS_RES_LND',
  FETCH_INVOICES_LND = 'FETCH_INVOICES_LND',
  SET_INVOICES_LND = 'SET_INVOICES_LND',
  UPDATE_INVOICE_LND = 'UPDATE_INVOICE_LND',
  UPDATE_PAYMENT_LND = 'UPDATE_PAYMENT_LND',
  SET_TOTAL_INVOICES_LND = 'SET_TOTAL_INVOICES_LND',
  FETCH_TRANSACTIONS_LND = 'FETCH_TRANSACTIONS_LND',
  SET_TRANSACTIONS_LND = 'SET_TRANSACTIONS_LND',
  FETCH_UTXOS_LND = 'FETCH_UTXOS_LND',
  SET_UTXOS_LND = 'SET_UTXOS_LND',
  FETCH_PAYMENTS_LND = 'FETCH_PAYMENTS_LND',
  SET_PAYMENTS_LND = 'SET_PAYMENTS_LND',
  SEND_PAYMENT_LND = 'SEND_PAYMENT_LND',
  SEND_PAYMENT_STATUS_LND = 'SEND_PAYMENT_STATUS_LND',
  FETCH_GRAPH_NODE_LND = 'FETCH_GRAPH_NODE_LND',
  SET_GRAPH_NODE_LND = 'SET_GRAPH_NODE_LND',
  GET_NEW_ADDRESS_LND = 'GET_NEW_ADDRESS_LND',
  SET_NEW_ADDRESS_LND = 'SET_NEW_ADDRESS_LND',
  SET_CHANNEL_TRANSACTION_LND = 'SET_CHANNEL_TRANSACTION_LND',
  SET_CHANNEL_TRANSACTION_RES_LND = 'SET_CHANNEL_TRANSACTION_RES_LND',
  GEN_SEED_LND = 'GEN_SEED_LND',
  GEN_SEED_RESPONSE_LND = 'GEN_SEED_RESPONSE_LND',
  INIT_WALLET_LND = 'INIT_WALLET_LND',
  INIT_WALLET_RESPONSE_LND = 'INIT_WALLET_RESPONSE_LND',
  UNLOCK_WALLET_LND = 'UNLOCK_WALLET_LND',
  PEER_LOOKUP_LND = 'PEER_LOOKUP_LND',
  CHANNEL_LOOKUP_LND = 'CHANNEL_LOOKUP_LND',
  INVOICE_LOOKUP_LND = 'INVOICE_LOOKUP_LND',
  PAYMENT_LOOKUP_LND = 'PAYMENT_LOOKUP_LND',
  SET_LOOKUP_LND = 'SET_LOOKUP_LND',
  GET_FORWARDING_HISTORY_LND = 'GET_FORWARDING_HISTORY_LND',
  SET_FORWARDING_HISTORY_LND = 'SET_FORWARDING_HISTORY_LND',
  GET_QUERY_ROUTES_LND = 'GET_QUERY_ROUTES_LND',
  SET_QUERY_ROUTES_LND = 'SET_QUERY_ROUTES_LND',
  GET_ALL_LIGHTNING_TRANSATIONS_LND = 'GET_ALL_LIGHTNING_TRANSATIONS_LND',
  SET_ALL_LIGHTNING_TRANSATIONS_LND = 'SET_ALL_LIGHTNING_TRANSATIONS_LND'
};

export enum CLNActions {
  RESET_CLN_STORE = 'RESET_CLN_STORE',
  UPDATE_API_CALL_STATUS_CLN = 'UPDATE_API_CALL_STATUS_CLN',
  SET_CHILD_NODE_SETTINGS_CLN = 'SET_CHILD_NODE_SETTINGS_CLN',
  FETCH_PAGE_SETTINGS_CLN = 'FETCH_PAGE_SETTINGS_CLN',
  SET_PAGE_SETTINGS_CLN = 'SET_PAGE_SETTINGS_CLN',
  SAVE_PAGE_SETTINGS_CLN = 'SAVE_PAGE_SETTINGS_CLN',
  FETCH_INFO_CLN = 'FETCH_INFO_CL_CLN',
  SET_INFO_CLN = 'SET_INFO_CLN',
  FETCH_FEES_CLN = 'FETCH_FEES_CLN',
  SET_FEES_CLN = 'SET_FEES_CLN',
  FETCH_FEE_RATES_CLN = 'FETCH_FEE_RATES_CLN',
  SET_FEE_RATES_CLN = 'SET_FEE_RATES_CLN',
  FETCH_BALANCE_CLN = 'FETCH_BALANCE_CLN',
  SET_BALANCE_CLN = 'SET_BALANCE_CLN',
  FETCH_LOCAL_REMOTE_BALANCE_CLN = 'FETCH_LOCAL_REMOTE_BALANCE_CLN',
  SET_LOCAL_REMOTE_BALANCE_CLN = 'SET_LOCAL_REMOTE_BALANCE_CLN',
  GET_NEW_ADDRESS_CLN = 'GET_NEW_ADDRESS_CLN',
  SET_NEW_ADDRESS_CLN = 'SET_NEW_ADDRESS_CLN',
  FETCH_UTXOS_CLN = 'FETCH_UTXOS_CLN',
  SET_UTXOS_CLN = 'SET_UTXOS_CLN',
  FETCH_PEERS_CLN = 'FETCH_PEERS_CLN',
  SET_PEERS_CLN = 'SET_PEERS_CLN',
  SAVE_NEW_PEER_CLN = 'SAVE_NEW_PEER_CLN',
  NEWLY_ADDED_PEER_CLN = 'NEWLY_ADDED_PEER_CLN',
  ADD_PEER_CLN = 'ADD_PEER_CLN',
  DETACH_PEER_CLN = 'DETACH_PEER_CLN',
  REMOVE_PEER_CLN = 'REMOVE_PEER_CLN',
  FETCH_CHANNELS_CLN = 'FETCH_CHANNELS_CLN',
  SET_CHANNELS_CLN = 'SET_CHANNELS_CLN',
  UPDATE_CHANNEL_CLN = 'UPDATE_CHANNEL_CLN',
  SAVE_NEW_CHANNEL_CLN = 'SAVE_NEW_CHANNEL_CLN',
  CLOSE_CHANNEL_CLN = 'CLOSE_CHANNEL_CLN',
  REMOVE_CHANNEL_CLN = 'REMOVE_CHANNEL_CLN',
  FETCH_PAYMENTS_CLN = 'FETCH_PAYMENTS_CLN',
  SET_PAYMENTS_CLN = 'SET_PAYMENTS_CLN',
  SEND_PAYMENT_CLN = 'SEND_PAYMENT_CLN',
  SEND_PAYMENT_STATUS_CLN = 'SEND_PAYMENT_STATUS_CLN',
  GET_QUERY_ROUTES_CLN = 'GET_QUERY_ROUTES_CLN',
  SET_QUERY_ROUTES_CLN = 'SET_QUERY_ROUTES_CLN',
  PEER_LOOKUP_CLN = 'PEER_LOOKUP_CLN',
  CHANNEL_LOOKUP_CLN = 'CHANNEL_LOOKUP_CLN',
  INVOICE_LOOKUP_CLN = 'INVOICE_LOOKUP_CLN',
  SET_LOOKUP_CLN = 'SET_LOOKUP_CLN',
  GET_FORWARDING_HISTORY_CLN = 'GET_FORWARDING_HISTORY_CLN',
  SET_FORWARDING_HISTORY_CLN = 'SET_FORWARDING_HISTORY_CLN',
  GET_FAILED_FORWARDING_HISTORY_CLN = 'GET_FAILED_FORWARDING_HISTORY_CLN',
  SET_FAILED_FORWARDING_HISTORY_CLN = 'SET_FAILED_FORWARDING_HISTORY_CLN',
  GET_LOCAL_FAILED_FORWARDING_HISTORY_CLN = 'GET_LOCAL_FAILED_FORWARDING_HISTORY_CLN',
  SET_LOCAL_FAILED_FORWARDING_HISTORY_CLN = 'SET_LOCAL_FAILED_FORWARDING_HISTORY_CLN',
  FETCH_INVOICES_CLN = 'FETCH_INVOICES_CLN',
  SET_INVOICES_CLN = 'SET_INVOICES_CLN',
  SAVE_NEW_INVOICE_CLN = 'SAVE_NEW_INVOICE_CLN',
  ADD_INVOICE_CLN = 'ADD_INVOICE_CLN',
  UPDATE_INVOICE_CLN = 'UPDATE_INVOICE_CLN',
  DELETE_EXPIRED_INVOICE_CLN = 'DELETE_EXPIRED_INVOICE_CLN',
  SET_CHANNEL_TRANSACTION_CLN = 'SET_CHANNEL_TRANSACTION_CLN',
  SET_CHANNEL_TRANSACTION_RES_CLN = 'SET_CHANNEL_TRANSACTION_RES_CLN',
  FETCH_OFFER_INVOICE_CLN = 'FETCH_OFFER_INVOICE_CLN',
  SET_OFFER_INVOICE_CLN = 'SET_OFFER_INVOICE_CLN',
  FETCH_OFFERS_CLN = 'FETCH_OFFERS_CLN',
  SET_OFFERS_CLN = 'SET_OFFERS_CLN',
  SAVE_NEW_OFFER_CLN = 'SAVE_NEW_OFFER_CLN',
  ADD_OFFER_CLN = 'ADD_OFFER_CLN',
  DISABLE_OFFER_CLN = 'DISABLE_OFFER_CLN',
  UPDATE_OFFER_CLN = 'UPDATE_OFFER_CLN',
  FETCH_OFFER_BOOKMARKS_CLN = 'FETCH_OFFER_BOOKMARKS_CLN',
  SET_OFFER_BOOKMARKS_CLN = 'SET_OFFER_BOOKMARKS_CLN',
  ADD_UPDATE_OFFER_BOOKMARK_CLN = 'ADD_UPDATE_OFFER_BOOKMARK_CLN',
  DELETE_OFFER_BOOKMARK_CLN = 'DELETE_OFFER_BOOKMARK_CLN',
  REMOVE_OFFER_BOOKMARK_CLN = 'REMOVE_OFFER_BOOKMARK_CL'
};

export enum ECLActions {
  RESET_ECL_STORE = 'RESET_ECL_STORE',
  UPDATE_API_CALL_STATUS_ECL = 'UPDATE_API_CALL_STATUS_ECL',
  SET_CHILD_NODE_SETTINGS_ECL = 'SET_CHILD_NODE_SETTINGS_ECL',
  FETCH_PAGE_SETTINGS_ECL = 'FETCH_PAGE_SETTINGS_ECL',
  SET_PAGE_SETTINGS_ECL = 'SET_PAGE_SETTINGS_ECL',
  SAVE_PAGE_SETTINGS_ECL = 'SAVE_PAGE_SETTINGS_ECL',
  FETCH_INFO_ECL = 'FETCH_INFO_ECL',
  SET_INFO_ECL = 'SET_INFO_ECL',
  FETCH_FEES_ECL = 'FETCH_FEES_ECL',
  SET_FEES_ECL = 'SET_FEES_ECL',
  FETCH_CHANNELS_ECL = 'FETCH_CHANNELS_ECL',
  SET_ACTIVE_CHANNELS_ECL = 'SET_ACTIVE_CHANNELS_ECL',
  SET_PENDING_CHANNELS_ECL = 'SET_PENDING_CHANNELS_ECL',
  SET_INACTIVE_CHANNELS_ECL = 'SET_INACTIVE_CHANNELS_ECL',
  FETCH_ONCHAIN_BALANCE_ECL = 'FETCH_ONCHAIN_BALANCE_ECL',
  SET_ONCHAIN_BALANCE_ECL = 'SET_ONCHAIN_BALANCE_ECL',
  FETCH_LIGHTNING_BALANCE_ECL = 'FETCH_LIGHTNING_BALANCE_ECL',
  SET_LIGHTNING_BALANCE_ECL = 'SET_LIGHTNING_BALANCE_ECL',
  SET_CHANNELS_STATUS_ECL = 'SET_CHANNELS_STATUS_ECL',
  FETCH_PEERS_ECL = 'FETCH_PEERS_ECL',
  SET_PEERS_ECL = 'SET_PEERS_ECL',
  SAVE_NEW_PEER_ECL = 'SAVE_NEW_PEER_ECL',
  NEWLY_ADDED_PEER_ECL = 'NEWLY_ADDED_PEER_ECL',
  ADD_PEER_ECL = 'ADD_PEER_ECL',
  DETACH_PEER_ECL = 'DETACH_PEER_ECL',
  REMOVE_PEER_ECL = 'REMOVE_PEER_ECL',
  GET_NEW_ADDRESS_ECL = 'GET_NEW_ADDRESS_ECL',
  SET_NEW_ADDRESS_ECL = 'SET_NEW_ADDRESS_ECL',
  SAVE_NEW_CHANNEL_ECL = 'SAVE_NEW_CHANNEL_ECL',
  UPDATE_CHANNEL_ECL = 'UPDATE_CHANNEL_ECL',
  CLOSE_CHANNEL_ECL = 'CLOSE_CHANNEL_ECL',
  REMOVE_CHANNEL_ECL = 'REMOVE_CHANNEL_ECL',
  FETCH_PAYMENTS_ECL = 'FETCH_PAYMENTS_ECL',
  SET_PAYMENTS_ECL = 'SET_PAYMENTS_ECL',
  GET_QUERY_ROUTES_ECL = 'GET_QUERY_ROUTES_ECL',
  SET_QUERY_ROUTES_ECL = 'SET_QUERY_ROUTES_ECL',
  SEND_PAYMENT_ECL = 'SEND_PAYMENT_ECL',
  SEND_PAYMENT_STATUS_ECL = 'SEND_PAYMENT_STATUS_ECL',
  FETCH_TRANSACTIONS_ECL = 'FETCH_TRANSACTIONS_ECL',
  SET_TRANSACTIONS_ECL = 'SET_TRANSACTIONS_ECL',
  SEND_ONCHAIN_FUNDS_ECL = 'SEND_ONCHAIN_FUNDS_ECL',
  SEND_ONCHAIN_FUNDS_RES_ECL = 'SEND_ONCHAIN_FUNDS_RES_ECL',
  FETCH_INVOICES_ECL = 'FETCH_INVOICES_ECL',
  SET_INVOICES_ECL = 'SET_INVOICES_ECL',
  SET_TOTAL_INVOICES_ECL = 'SET_TOTAL_INVOICES_ECL',
  CREATE_INVOICE_ECL = 'CREATE_INVOICE_ECL',
  ADD_INVOICE_ECL = 'ADD_INVOICE_ECL',
  UPDATE_INVOICE_ECL = 'UPDATE_INVOICE_ECL',
  PEER_LOOKUP_ECL = 'PEER_LOOKUP_ECL',
  INVOICE_LOOKUP_ECL = 'INVOICE_LOOKUP_ECL',
  SET_LOOKUP_ECL = 'SET_LOOKUP_ECL',
  UPDATE_CHANNEL_STATE_ECL = 'UPDATE_CHANNEL_STATE_ECL',
  UPDATE_RELAYED_PAYMENT_ECL = 'UPDATE_RELAYED_PAYMENT_ECL'
};

export const NODE_FEATURES_CLN = [
  { range: { min: 0, max: 1 }, description: 'Requires or supports extra channel re-establish fields' },
  { range: { min: 4, max: 5 }, description: 'Commits to a shutdown script pubkey when opening channel' },
  { range: { min: 6, max: 7 }, description: 'More sophisticated gossip control' },
  { range: { min: 8, max: 9 }, description: 'Requires/supports variable-length routing onion payloads' },
  { range: { min: 10, max: 11 }, description: 'Gossip queries can include additional information' },
  { range: { min: 12, max: 13 }, description: 'Static key for remote output' },
  { range: { min: 14, max: 15 }, description: 'Node supports payment secret field' },
  { range: { min: 16, max: 17 }, description: 'Node can receive basic multi-part payments' },
  { range: { min: 18, max: 19 }, description: 'Node can create large channels' },
  { range: { min: 20, max: 21 }, description: 'Anchor outputs' },
  { range: { min: 22, max: 23 }, description: 'Anchor commitment type with zero fee HTLC transactions' },
  { range: { min: 26, max: 27 }, description: 'Future segwit versions allowed in shutdown' }
];

export enum NodeFeaturesECL {
  gossip_queries_ex = 'Gossip queries including additional information',
  option_anchor_outputs = 'Anchor outputs',
  option_data_loss_protect = 'Extra channel re-establish fields',
  var_onion_optin = 'Variable-length routing onion payloads',
  option_static_remotekey = 'Static key for remote output',
  option_support_large_channel = 'Create large channels',
  option_anchors_zero_fee_htlc_tx = 'Anchor commitment type with zero fee HTLC transactions',
  payment_secret = 'Payment secret field',
  option_shutdown_anysegwit = 'Future segwit versions allowed in shutdown',
  basic_mpp = 'Basic multi-part payments',
  gossip_queries = 'More sophisticated gossip control',
  option_upfront_shutdown_script = 'Shutdown script pubkey when opening channel',
  anchors_zero_fee_htlc_tx = 'Anchor commitment type with zero fee HTLC transactions',
  amp = 'AMP'
};

export enum NodeFeaturesLND {
  'data-loss-protect' = 'Extra channel re-establish fields',
  'upfront-shutdown-script' = 'Shutdown script pubkey when opening channel',
  'gossip-queries' = 'More sophisticated gossip control',
  'tlv-onion' = 'Variable-length routing onion payloads',
  'ext-gossip-queries' = 'Gossip queries can include additional information',
  'static-remote-key' = 'Static key for remote output',
  'payment-addr' = 'Payment secret field',
  'multi-path-payments' = 'Basic multi-part payments',
  'wumbo-channels' = 'Wumbo Channels',
  'anchors' = 'Anchor outputs',
  'anchors-zero-fee-htlc-tx' = 'Anchor commitment type with zero fee HTLC transactions',
  'amp' = 'AMP'
};

export const LADS_POLICY = [
  { id: 'match', placeholder: 'Policy Match (%age)', min: 0, max: 200 },
  { id: 'available', placeholder: 'Policy Available (%age)', min: 0, max: 100 },
  { id: 'fixed', placeholder: 'Fixed Policy (Sats)', min: 0, max: 100 }
];

export enum CLNForwardingEventsStatusEnum {
  OFFERED = 'offered',
  SETTLED = 'settled',
  FAILED = 'failed',
  LOCAL_FAILED = 'local_failed'
}

export enum PeerswapTypes {
  SWAP_OUT = 'swap-out',
  SWAP_IN = 'swap-in'
}

export enum PeerswapRoles {
  SENDER = 'sender',
  RECEIVER = 'receiver'
}

export enum PeerswapStates {
  SWAP_CANCELED = 'State_SwapCanceled'
}

export enum PeerswapPeersLists {
  ALLOWED = 'allowed',
  SUSPICIOUS = 'suspicious'
}

export const ECL_CHANNEL_TYPES = [
  { id: 'standard', placeholder: 'Standard' },
  { id: 'static_remotekey', placeholder: 'Static Remotekey' },
  { id: 'anchor_outputs_zero_fee_htlc_tx', placeholder: 'Anchor Output' }
];

export enum SortOrderEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

export const SORT_ORDERS = ['asc', 'desc'];

export const CLN_DEFAULT_PAGE_SETTINGS: PageSettings[] = [
  { pageId: 'on_chain', tables: [
    { tableId: 'utxos', recordsPerPage: PAGE_SIZE, sortBy: 'blockheight', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['txid', 'value'],
      columnSelection: ['txid', 'output', 'value', 'blockheight'] },
    { tableId: 'dust_utxos', recordsPerPage: PAGE_SIZE, sortBy: 'blockheight', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['txid', 'value'],
      columnSelection: ['txid', 'output', 'value', 'blockheight'] }
  ] },
  { pageId: 'peers_channels', tables: [
    { tableId: 'open_channels', recordsPerPage: PAGE_SIZE, sortBy: 'msatoshi_to_us', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'msatoshi_to_us', 'msatoshi_to_them'],
      columnSelection: ['short_channel_id', 'alias', 'msatoshi_to_us', 'msatoshi_to_them', 'balancedness'] },
    { tableId: 'pending_inactive_channels', recordsPerPage: PAGE_SIZE, sortBy: 'state', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'state'],
      columnSelection: ['alias', 'connected', 'state', 'msatoshi_total'] },
    { tableId: 'peers', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.ASCENDING,
      columnSelectionSM: ['alias', 'id'],
      columnSelection: ['alias', 'id', 'netaddr'] }
  ] },
  { pageId: 'liquidity_ads', tables: [
    { tableId: 'liquidity_ads', recordsPerPage: PAGE_SIZE, sortBy: 'channel_opening_fee', sortOrder: SortOrderEnum.ASCENDING,
      columnSelectionSM: ['alias', 'channel_opening_fee'],
      columnSelection: ['alias', 'last_timestamp', 'lease_fee', 'routing_fee', 'channel_opening_fee'] }
  ] },
  { pageId: 'transactions', tables: [
    { tableId: 'payments', recordsPerPage: PAGE_SIZE, sortBy: 'created_at', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['created_at', 'msatoshi'],
      columnSelection: ['created_at', 'type', 'payment_hash', 'msatoshi_sent', 'msatoshi'] },
    { tableId: 'invoices', recordsPerPage: PAGE_SIZE, sortBy: 'expires_at', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['expires_at', 'msatoshi'],
      columnSelection: ['expires_at', 'paid_at', 'type', 'description', 'msatoshi', 'msatoshi_received'] },
    { tableId: 'offers', recordsPerPage: PAGE_SIZE, sortBy: 'offer_id', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['offer_id', 'single_use'],
      columnSelection: ['offer_id', 'single_use', 'used'] },
    { tableId: 'offer_bookmarks', recordsPerPage: PAGE_SIZE, sortBy: 'lastUpdatedAt', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['lastUpdatedAt', 'amountMSat'],
      columnSelection: ['lastUpdatedAt', 'title', 'amountMSat', 'description'] }
  ] },
  { pageId: 'routing', tables: [
    { tableId: 'forwarding_history', recordsPerPage: PAGE_SIZE, sortBy: 'received_time', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['received_time', 'in_msatoshi', 'out_msatoshi'],
      columnSelection: ['received_time', 'resolved_time', 'in_channel_alias', 'out_channel_alias', 'in_msatoshi', 'out_msatoshi', 'fee'] },
    { tableId: 'routing_peers', recordsPerPage: PAGE_SIZE, sortBy: 'total_fee', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'events', 'total_fee'],
      columnSelection: ['channel_id', 'alias', 'events', 'total_amount', 'total_fee'] },
    { tableId: 'failed', recordsPerPage: PAGE_SIZE, sortBy: 'received_time', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['received_time', 'in_channel_alias', 'in_msatoshi'],
      columnSelection: ['received_time', 'resolved_time', 'in_channel_alias', 'out_channel_alias', 'in_msatoshi', 'out_msatoshi', 'fee'] },
    { tableId: 'local_failed', recordsPerPage: PAGE_SIZE, sortBy: 'received_time', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['received_time', 'in_channel_alias', 'in_msatoshi'],
      columnSelection: ['received_time', 'in_channel_alias', 'in_msatoshi', 'style', 'failreason'] }
  ] },
  { pageId: 'reports', tables: [
    { tableId: 'routing', recordsPerPage: PAGE_SIZE, sortBy: 'received_time', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['received_time', 'in_msatoshi', 'out_msatoshi'],
      columnSelection: ['received_time', 'resolved_time', 'in_channel_alias', 'out_channel_alias', 'in_msatoshi', 'out_msatoshi', 'fee'] },
    { tableId: 'transactions', recordsPerPage: PAGE_SIZE, sortBy: 'date', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['date', 'amount_paid', 'amount_received'],
      columnSelection: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices'] }
  ] },
  { pageId: 'graph_lookup', tables: [
    { tableId: 'query_routes', recordsPerPage: PAGE_SIZE, sortBy: 'msatoshi', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'direction', 'msatoshi'],
      columnSelection: ['alias', 'channel', 'direction', 'delay', 'msatoshi'] }
  ] },
  { pageId: 'peerswap', tables: [
    { tableId: 'swaps', recordsPerPage: PAGE_SIZE, sortBy: '', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: [],
      columnSelection: [] }
  ] }
];

export const CLN_TABLES_DEF = {
  on_chain: {
    utxos: {
      maxColumns: 7,
      allowedColumns: ['txid', 'address', 'scriptpubkey', 'output', 'value', 'blockheight', 'reserved']
    },
    dust_utxos: {
      maxColumns: 7,
      allowedColumns: ['txid', 'address', 'scriptpubkey', 'output', 'value', 'blockheight', 'reserved']
    }
  },
  peers_channels: {
    open_channels: {
      maxColumns: 8,
      allowedColumns: ['short_channel_id', 'alias', 'id', 'channel_id', 'funding_txid', 'connected', 'our_channel_reserve_satoshis', 'their_channel_reserve_satoshis', 'msatoshi_total', 'spendable_msatoshi', 'msatoshi_to_us', 'msatoshi_to_them', 'balancedness']
    },
    pending_inactive_channels: {
      maxColumns: 8,
      allowedColumns: ['alias', 'id', 'channel_id', 'funding_txid', 'connected', 'state', 'our_channel_reserve_satoshis', 'their_channel_reserve_satoshis', 'msatoshi_total', 'spendable_msatoshi', 'msatoshi_to_us', 'msatoshi_to_them']
    },
    peers: {
      maxColumns: 3,
      allowedColumns: ['alias', 'id', 'netaddr']
    }
  },
  liquidity_ads: {
    liquidity_ads: {
      maxColumns: 8,
      allowedColumns: ['alias', 'nodeid', 'last_timestamp', 'compact_lease', 'lease_fee', 'routing_fee', 'channel_opening_fee', 'funding_weight']
    }
  },
  transactions: {
    payments: {
      maxColumns: 7,
      allowedColumns: ['created_at', 'type', 'payment_hash', 'bolt11', 'destination', 'memo', 'label', 'msatoshi_sent', 'msatoshi']
    },
    invoices: {
      maxColumns: 7,
      allowedColumns: ['expires_at', 'paid_at', 'type', 'description', 'label', 'payment_hash', 'bolt11', 'msatoshi', 'msatoshi_received']
    },
    offers: {
      maxColumns: 4,
      allowedColumns: ['offer_id', 'single_use', 'used', 'bolt12']
    },
    offer_bookmarks: {
      maxColumns: 6,
      allowedColumns: ['lastUpdatedAt', 'title', 'amountMSat', 'description', 'vendor', 'bolt12']
    }
  },
  routing: {
    forwarding_history: {
      maxColumns: 8,
      allowedColumns: ['received_time', 'resolved_time', 'in_channel', 'in_channel_alias', 'out_channel', 'out_channel_alias', 'payment_hash', 'in_msatoshi', 'out_msatoshi', 'fee']
    },
    routing_peers: {
      maxColumns: 5,
      allowedColumns: ['channel_id', 'alias', 'events', 'total_amount', 'total_fee']
    },
    failed: {
      maxColumns: 7,
      allowedColumns: ['received_time', 'resolved_time', 'in_channel', 'in_channel_alias', 'out_channel', 'out_channel_alias', 'in_msatoshi', 'out_msatoshi', 'fee']
    },
    local_failed: {
      maxColumns: 6,
      allowedColumns: ['received_time', 'in_channel', 'in_channel_alias', 'out_channel', 'out_channel_alias', 'in_msatoshi', 'style', 'failreason']
    }
  },
  reports: {
    routing: {
      maxColumns: 8,
      allowedColumns: ['received_time', 'resolved_time', 'in_channel', 'in_channel_alias', 'out_channel', 'out_channel_alias', 'payment_hash', 'in_msatoshi', 'out_msatoshi', 'fee']
    },
    transactions: {
      maxColumns: 5,
      allowedColumns: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices']
    }
  },
  graph_lookup: {
    query_routes: {
      maxColumns: 6,
      allowedColumns: ['id', 'alias', 'channel', 'direction', 'delay', 'msatoshi']
    }
  },
  peerswap: {
    swaps: {
      maxColumns: 5,
      allowedColumns: []
    }
  }
};

export const LND_DEFAULT_PAGE_SETTINGS: PageSettings[] = [
  { pageId: 'on_chain', tables: [
    { tableId: 'utxos', recordsPerPage: PAGE_SIZE, sortBy: 'tx_id', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['output', 'amount_sat', 'confirmations'],
      columnSelection: ['tx_id', 'output', 'label', 'amount_sat', 'confirmations'] },
    { tableId: 'transactions', recordsPerPage: PAGE_SIZE, sortBy: 'time_stamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['time_stamp', 'amount', 'num_confirmations'],
      columnSelection: ['time_stamp', 'label', 'amount', 'total_fees', 'block_height', 'num_confirmations'] },
    { tableId: 'dust_utxos', recordsPerPage: PAGE_SIZE, sortBy: 'tx_id', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['output', 'amount_sat', 'confirmations'],
      columnSelection: ['tx_id', 'output', 'label', 'amount_sat', 'confirmations'] }
  ] },
  { pageId: 'peers_channels', tables: [
    { tableId: 'open', recordsPerPage: PAGE_SIZE, sortBy: 'balancedness', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'local_balance', 'remote_balance'],
      columnSelection: ['remote_alias', 'uptime', 'total_satoshis_sent', 'total_satoshis_received', 'local_balance', 'remote_balance', 'balancedness'] },
    { tableId: 'pending_open', sortBy: 'capacity', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'capacity'],
      columnSelection: ['remote_alias', 'commit_fee', 'commit_weight', 'capacity'] },
    { tableId: 'pending_force_closing', sortBy: 'limbo_balance', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'limbo_balance'],
      columnSelection: ['remote_alias', 'recovered_balance', 'limbo_balance', 'capacity'] },
    { tableId: 'pending_closing', sortBy: 'capacity', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'capacity'],
      columnSelection: ['remote_alias', 'local_balance', 'remote_balance', 'capacity'] },
    { tableId: 'pending_waiting_close', sortBy: 'limbo_balance', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'limbo_balance'],
      columnSelection: ['remote_alias', 'limbo_balance', 'local_balance', 'remote_balance'] },
    { tableId: 'closed', recordsPerPage: PAGE_SIZE, sortBy: 'close_type', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'settled_balance'],
      columnSelection: ['close_type', 'remote_alias', 'capacity', 'close_height', 'settled_balance'] },
    { tableId: 'active_HTLCs', recordsPerPage: PAGE_SIZE, sortBy: 'expiration_height', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['amount', 'incoming', 'expiration_height'],
      columnSelection: ['amount', 'incoming', 'expiration_height', 'hash_lock'] },
    { tableId: 'peers', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'sat_sent', 'sat_recv'],
      columnSelection: ['alias', 'pub_key', 'sat_sent', 'sat_recv', 'ping_time'] }
  ] },
  { pageId: 'transactions', tables: [
    { tableId: 'payments', recordsPerPage: PAGE_SIZE, sortBy: 'creation_date', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['creation_date', 'fee', 'value'],
      columnSelection: ['creation_date', 'payment_hash', 'fee', 'value', 'hops'] },
    { tableId: 'invoices', recordsPerPage: PAGE_SIZE, sortBy: 'creation_date', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['creation_date', 'settle_date', 'value'],
      columnSelection: ['creation_date', 'settle_date', 'memo', 'value', 'amt_paid_sat'] }
  ] },
  { pageId: 'routing', tables: [
    { tableId: 'forwarding_history', recordsPerPage: PAGE_SIZE, sortBy: 'timestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amt_in', 'amt_out'],
      columnSelection: ['timestamp', 'alias_in', 'alias_out', 'amt_in', 'amt_out', 'fee_msat'] },
    { tableId: 'routing_peers', recordsPerPage: PAGE_SIZE, sortBy: 'total_amount', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'events', 'total_amount'],
      columnSelection: ['chan_id', 'alias', 'events', 'total_amount'] },
    { tableId: 'non_routing_peers', recordsPerPage: PAGE_SIZE, sortBy: 'remote_alias', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['remote_alias', 'local_balance', 'remote_balance'],
      columnSelection: ['chan_id', 'remote_alias', 'total_satoshis_received', 'total_satoshis_sent', 'local_balance', 'remote_balance'] }
  ] },
  { pageId: 'reports', tables: [
    { tableId: 'routing', recordsPerPage: PAGE_SIZE, sortBy: 'timestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amt_in', 'amt_out'],
      columnSelection: ['timestamp', 'alias_in', 'alias_out', 'amt_in', 'amt_out', 'fee_msat'] },
    { tableId: 'transactions', recordsPerPage: PAGE_SIZE, sortBy: 'date', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['date', 'amount_paid', 'amount_received'],
      columnSelection: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices'] }
  ] },
  { pageId: 'graph_lookup', tables: [
    { tableId: 'query_routes', recordsPerPage: PAGE_SIZE, sortBy: 'hop_sequence', sortOrder: SortOrderEnum.ASCENDING,
      columnSelectionSM: ['hop_sequence', 'pubkey_alias', 'fee_msat'],
      columnSelection: ['hop_sequence', 'pubkey_alias', 'chan_capacity', 'amt_to_forward_msat', 'fee_msat'] }
  ] },
  { pageId: 'loop', tables: [
    { tableId: 'loop', recordsPerPage: PAGE_SIZE, sortBy: 'initiation_time', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['state', 'amt'],
      columnSelection: ['state', 'initiation_time', 'amt', 'cost_server', 'cost_offchain', 'cost_onchain'] }
  ] },
  { pageId: 'boltz', tables: [
    { tableId: 'swap_out', recordsPerPage: PAGE_SIZE, sortBy: 'status', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['status', 'id', 'onchainAmount'],
      columnSelection: ['status', 'id', 'claimAddress', 'onchainAmount', 'timeoutBlockHeight'] },
    { tableId: 'swap_in', recordsPerPage: PAGE_SIZE, sortBy: 'status', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['status', 'id', 'expectedAmount'],
      columnSelection: ['status', 'id', 'lockupAddress', 'expectedAmount', 'timeoutBlockHeight'] }
  ] }
];

export const LND_TABLES_DEF = {
  on_chain: {
    utxos: {
      maxColumns: 5,
      allowedColumns: ['tx_id', 'output', 'label', 'amount_sat', 'confirmations']
    },
    transactions: {
      maxColumns: 7,
      allowedColumns: ['time_stamp', 'label', 'amount', 'total_fees', 'block_height', 'num_confirmations']
    },
    dust_utxos: {
      maxColumns: 5,
      allowedColumns: ['tx_id', 'output', 'label', 'amount_sat', 'confirmations']
    }
  },
  peers_channels: {
    open: {
      maxColumns: 7,
      allowedColumns: ['remote_alias', 'uptime', 'total_satoshis_sent', 'total_satoshis_received', 'local_balance', 'remote_balance', 'balancedness']
    },
    pending_open: {
      maxColumns: 7,
      allowedColumns: ['remote_alias', 'remote_node_pub', 'channel_point', 'initiator', 'commitment_type', 'confirmation_height', 'commit_fee', 'commit_weight', 'fee_per_kw', 'capacity', 'local_balance', 'remote_balance']
    },
    pending_force_closing: {
      maxColumns: 7,
      allowedColumns: ['closing_txid', 'remote_alias', 'remote_node_pub', 'channel_point', 'initiator', 'commitment_type', 'limbo_balance', 'maturity_height', 'blocks_til_maturity', 'recovered_balance', 'capacity', 'local_balance', 'remote_balance']
    },
    pending_closing: {
      maxColumns: 7,
      allowedColumns: ['closing_txid', 'remote_alias', 'remote_node_pub', 'channel_point', 'initiator', 'commitment_type', 'capacity', 'local_balance', 'remote_balance']
    },
    pending_waiting_close: {
      maxColumns: 7,
      allowedColumns: ['remote_alias', 'remote_node_pub', 'channel_point', 'initiator', 'commitment_type', 'limbo_balance', 'capacity', 'local_balance', 'remote_balance']
    },
    closed: {
      maxColumns: 5,
      allowedColumns: ['close_type', 'remote_alias', 'capacity', 'close_height', 'settled_balance']
    },
    active_HTLCs: {
      maxColumns: 4,
      allowedColumns: ['amount', 'incoming', 'expiration_height', 'hash_lock']
    },
    peers: {
      maxColumns: 8,
      allowedColumns: ['alias', 'pub_key', 'address', 'sync_type', 'inbound', 'bytes_sent', 'bytes_recv', 'sat_sent', 'sat_recv', 'ping_time']
    }
  },
  transactions: {
    payments: {
      maxColumns: 8,
      allowedColumns: ['creation_date', 'payment_hash', 'payment_request', 'payment_preimage', 'description', 'description_hash', 'failure_reason', 'payment_index', 'fee', 'value', 'hops']
    },
    invoices: {
      maxColumns: 9,
      allowedColumns: ['private', 'is_keysend', 'is_amp', 'creation_date', 'settle_date', 'memo', 'r_preimage', 'r_hash', 'payment_addr', 'payment_request', 'description_hash', 'expiry', 'cltv_expiry', 'add_index', 'settle_index', 'value', 'amt_paid_sat']
    }
  },
  routing: {
    forwarding_history: {
      maxColumns: 6,
      allowedColumns: ['timestamp', 'alias_in', 'alias_out', 'amt_in', 'amt_out', 'fee_msat']
    },
    routing_peers: {
      maxColumns: 4,
      allowedColumns: ['chan_id', 'alias', 'events', 'total_amount']
    },
    non_routing_peers: {
      maxColumns: 6,
      allowedColumns: ['chan_id', 'remote_alias', 'total_satoshis_received', 'total_satoshis_sent', 'local_balance', 'remote_balance']
    }
  },
  reports: {
    routing: {
      maxColumns: 6,
      allowedColumns: ['timestamp', 'alias_in', 'alias_out', 'amt_in', 'amt_out', 'fee_msat']
    },
    transactions: {
      maxColumns: 5,
      allowedColumns: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices']
    }
  },
  graph_lookup: {
    query_routes: {
      maxColumns: 5,
      allowedColumns: ['hop_sequence', 'pubkey_alias', 'chan_capacity', 'amt_to_forward_msat', 'fee_msat']
    }
  },
  loop: {
    loop: {
      maxColumns: 8,
      allowedColumns: ['state', 'initiation_time', 'last_update_time', 'amt', 'cost_server', 'cost_offchain', 'cost_onchain', 'htlc_address', 'id', 'id_bytes']
    }
  },
  boltz: {
    swap_out: {
      maxColumns: 7,
      allowedColumns: ['status', 'id', 'claimAddress', 'onchainAmount', 'error', 'privateKey', 'preimage', 'redeemScript', 'invoice', 'timeoutBlockHeight', 'lockupTransactionId', 'claimTransactionId']
    },
    swap_in: {
      maxColumns: 7,
      allowedColumns: ['status', 'id', 'lockupAddress', 'expectedAmount', 'error', 'privateKey', 'preimage', 'redeemScript', 'invoice', 'timeoutBlockHeight', 'lockupTransactionId', 'refundTransactionId']
    }
  }
};

export const ECL_DEFAULT_PAGE_SETTINGS: PageSettings[] = [
  { pageId: 'on_chain', tables: [
    { tableId: 'transaction', recordsPerPage: PAGE_SIZE, sortBy: 'timestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amount'],
      columnSelection: ['timestamp', 'amount', 'fees', 'confirmations', 'address'] }
  ] },
  { pageId: 'peers_channels', tables: [
    { tableId: 'open_channels', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'toLocal', 'toRemote'],
      columnSelection: ['shortChannelId', 'alias', 'feeBaseMsat', 'feeProportionalMillionths', 'toLocal', 'toRemote', 'balancedness'] },
    { tableId: 'pending_channels', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['state', 'alias', 'toLocal'],
      columnSelection: ['state', 'alias', 'toLocal', 'toRemote'] },
    { tableId: 'inactive_channels', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['state', 'alias', 'toLocal'],
      columnSelection: ['state', 'shortChannelId', 'alias', 'toLocal', 'toRemote', 'balancedness'] },
    { tableId: 'peers', recordsPerPage: PAGE_SIZE, sortBy: 'alias', sortOrder: SortOrderEnum.ASCENDING,
      columnSelectionSM: ['alias', 'nodeId'],
      columnSelection: ['alias', 'nodeId', 'address', 'channels'] }
  ] },
  { pageId: 'transactions', tables: [
    { tableId: 'payments', recordsPerPage: PAGE_SIZE, sortBy: 'firstPartTimestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['firstPartTimestamp', 'recipientAmount'],
      columnSelection: ['firstPartTimestamp', 'id', 'recipientNodeAlias', 'recipientAmount'] },
    { tableId: 'invoices', recordsPerPage: PAGE_SIZE, sortBy: 'receivedAt', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amount', 'amountSettled'],
      columnSelection: ['timestamp', 'receivedAt', 'description', 'amount', 'amountSettled'] }
  ] },
  { pageId: 'routing', tables: [
    { tableId: 'forwarding_history', recordsPerPage: PAGE_SIZE, sortBy: 'timestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amountIn', 'fee'],
      columnSelection: ['timestamp', 'fromChannelAlias', 'toChannelAlias', 'amountIn', 'amountOut', 'fee'] },
    { tableId: 'routing_peers', recordsPerPage: PAGE_SIZE, sortBy: 'totalFee', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['alias', 'events', 'totalFee'],
      columnSelection: ['channelId', 'alias', 'events', 'totalAmount', 'totalFee'] }
  ] },
  { pageId: 'reports', tables: [
    { tableId: 'routing', recordsPerPage: PAGE_SIZE, sortBy: 'timestamp', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['timestamp', 'amountIn', 'fee'],
      columnSelection: ['timestamp', 'fromChannelAlias', 'toChannelAlias', 'amountIn', 'amountOut', 'fee'] },
    { tableId: 'transactions', recordsPerPage: PAGE_SIZE, sortBy: 'date', sortOrder: SortOrderEnum.DESCENDING,
      columnSelectionSM: ['date', 'amount_paid', 'amount_received'],
      columnSelection: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices'] }
  ] }
];

export const ECL_TABLES_DEF = {
  on_chain: {
    transaction: {
      maxColumns: 6,
      allowedColumns: ['timestamp', 'amount', 'fees', 'confirmations', 'address', 'blockHash', 'txid']
    }
  },
  peers_channels: {
    open_channels: {
      maxColumns: 8,
      allowedColumns: ['shortChannelId', 'channelId', 'alias', 'nodeId', 'isFunder', 'buried', 'feeBaseMsat', 'feeProportionalMillionths', 'toLocal', 'toRemote', 'feeRatePerKw', 'balancedness']
    },
    pending_channels: {
      maxColumns: 7,
      allowedColumns: ['state', 'channelId', 'alias', 'nodeId', 'isFunder', 'buried', 'feeBaseMsat', 'feeProportionalMillionths', 'toLocal', 'toRemote', 'feeRatePerKw']
    },
    inactive_channels: {
      maxColumns: 8,
      allowedColumns: ['state', 'shortChannelId', 'channelId', 'alias', 'nodeId', 'isFunder', 'buried', 'feeBaseMsat', 'feeProportionalMillionths', 'toLocal', 'toRemote', 'feeRatePerKw']
    },
    peers: {
      maxColumns: 4,
      allowedColumns: ['alias', 'nodeId', 'address', 'channels']
    }
  },
  transactions: {
    payments: {
      maxColumns: 7,
      allowedColumns: ['firstPartTimestamp', 'id', 'recipientNodeId', 'recipientNodeAlias', 'description', 'paymentHash', 'paymentPreimage', 'recipientAmount']
    },
    invoices: {
      maxColumns: 7,
      allowedColumns: ['timestamp', 'expiresAt', 'receivedAt', 'nodeId', 'description', 'paymentHash', 'amount', 'amountSettled']
    }
  },
  routing: {
    forwarding_history: {
      maxColumns: 7,
      allowedColumns: ['timestamp', 'fromChannelId', 'fromShortChannelId', 'fromChannelAlias', 'toChannelId', 'toShortChannelId', 'toChannelAlias', 'paymentHash', 'amountIn', 'amountOut', 'fee']
    },
    routing_peers: {
      maxColumns: 5,
      allowedColumns: ['channelId', 'alias', 'events', 'totalAmount', 'totalFee']
    }
  },
  reports: {
    routing: {
      maxColumns: 7,
      allowedColumns: ['timestamp', 'fromChannelId', 'fromShortChannelId', 'fromChannelAlias', 'toChannelId', 'toShortChannelId', 'toChannelAlias', 'paymentHash', 'amountIn', 'amountOut', 'fee']
    },
    transactions: {
      maxColumns: 5,
      allowedColumns: ['date', 'amount_paid', 'num_payments', 'amount_received', 'num_invoices']
    }
  }
};
