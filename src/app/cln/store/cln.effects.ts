import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Subject, of } from 'rxjs';
import { map, mergeMap, catchError, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

import { LoggerService } from '../../shared/services/logger.service';
import { CommonService } from '../../shared/services/common.service';
import { SessionService } from '../../shared/services/session.service';
import { WebSocketClientService } from '../../shared/services/web-socket.service';
import { ErrorMessageComponent } from '../../shared/components/data-modal/error-message/error-message.component';
import { CLNInvoiceInformationComponent } from '../transactions/invoices/invoice-information-modal/invoice-information.component';
import { GetInfo, Payment, FeeRates, ListInvoices, Invoice, Peer, OnChain, QueryRoutes, SaveChannel, GetNewAddress, DetachPeer, UpdateChannel, CloseChannel, SendPayment, GetQueryRoutes, ChannelLookup, Channel, OfferInvoice, Offer } from '../../shared/models/clnModels';
import { API_URL, API_END_POINTS, SECS_IN_YEAR, AlertTypeEnum, APICallStatusEnum, UI_MESSAGES, CLNWSEventTypeEnum, CLNActions, RTLActions, CLNForwardingEventsStatusEnum } from '../../shared/services/consts-enums-functions';
import { closeAllDialogs, closeSpinner, logout, openAlert, openSnackBar, openSpinner, setApiUrl, setNodeData } from '../../store/rtl.actions';

import { RTLState } from '../../store/rtl.state';
import { addUpdateOfferBookmark, fetchUTXOBalances, fetchChannels, fetchFeeRates, fetchInvoices, fetchPayments, fetchPeers, setLookup, setPeers,
  setQueryRoutes, updateCLNAPICallStatus, updateInvoice, setOfferInvoice, sendPaymentStatus, setForwardingHistory } from './cln.actions';
import { allAPIsCallStatus } from './cln.selector';
import { ApiCallsListCL } from '../../shared/models/apiCallsPayload';
import { CLNOfferInformationComponent } from '../transactions/offers/offer-information-modal/offer-information.component';

@Injectable()
export class CLNEffects implements OnDestroy {

  CHILD_API_URL = API_URL + '/cln';
  CLN_VERISON = '';
  private flgInitialized = false;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject()];

  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private store: Store<RTLState>,
    private sessionService: SessionService,
    private commonService: CommonService,
    private logger: LoggerService,
    private router: Router,
    private wsService: WebSocketClientService,
    private location: Location
  ) {
    this.store.select(allAPIsCallStatus).pipe(takeUntil(this.unSubs[0])).subscribe((allApisCallStatus: ApiCallsListCL) => {
      if (
        ((allApisCallStatus.FetchInfo.status === APICallStatusEnum.COMPLETED || allApisCallStatus.FetchInfo.status === APICallStatusEnum.ERROR) &&
          (allApisCallStatus.FetchChannels.status === APICallStatusEnum.COMPLETED || allApisCallStatus.FetchChannels.status === APICallStatusEnum.ERROR) &&
          (allApisCallStatus.FetchUTXOBalances.status === APICallStatusEnum.COMPLETED || allApisCallStatus.FetchUTXOBalances.status === APICallStatusEnum.ERROR)) &&
        !this.flgInitialized
      ) {
        this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.INITALIZE_NODE_DATA }));
        this.flgInitialized = true;
      }
    });
    this.wsService.clWSMessages.pipe(
      takeUntil(this.unSubs[1])).
      subscribe((newMessage) => {
        this.logger.info('Received new message from the service: ' + JSON.stringify(newMessage));
        if (newMessage && newMessage.data) {
          if (newMessage.data[CLNWSEventTypeEnum.INVOICE_PAYMENT] && newMessage.data[CLNWSEventTypeEnum.INVOICE_PAYMENT].label) {
            this.store.dispatch(updateInvoice({ payload: newMessage.data[CLNWSEventTypeEnum.INVOICE_PAYMENT] }));
          }
        }
      });
  }

  infoFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_INFO_CLN),
    mergeMap((action: { type: string, payload: { loadPage: string } }) => {
      this.flgInitialized = false;
      this.store.dispatch(setApiUrl({ payload: this.CHILD_API_URL }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchInfo', status: APICallStatusEnum.INITIATED } }));
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.GET_NODE_INFO }));
      return this.httpClient.get<GetInfo>(this.CHILD_API_URL + API_END_POINTS.GETINFO_API).
        pipe(
          takeUntil(this.actions.pipe(ofType(RTLActions.SET_SELECTED_NODE))),
          map((info) => {
            this.logger.info(info);
            this.CLN_VERISON = info.version || '';
            if (info.chains && info.chains.length && info.chains[0] &&
              (typeof info.chains[0] === 'object' && info.chains[0].hasOwnProperty('chain') && info?.chains[0].chain &&
                (info?.chains[0].chain.toLowerCase().indexOf('bitcoin') < 0 && info?.chains[0].chain.toLowerCase().indexOf('liquid') < 0)
              )
            ) {
              this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchInfo', status: APICallStatusEnum.COMPLETED } }));
              this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.GET_NODE_INFO }));
              this.store.dispatch(closeAllDialogs());
              setTimeout(() => {
                this.store.dispatch(openAlert({
                  payload: {
                    data: {
                      type: AlertTypeEnum.ERROR,
                      alertTitle: 'Shitcoin Found',
                      titleMessage: 'Sorry Not Sorry, RTL is Bitcoin Only!'
                    }
                  }
                }));
              }, 500);
              return {
                type: RTLActions.LOGOUT,
                payload: 'Sorry Not Sorry, RTL is Bitcoin Only!'
              };
            } else {
              this.initializeRemainingData(info, action.payload.loadPage);
              this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchInfo', status: APICallStatusEnum.COMPLETED } }));
              this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.GET_NODE_INFO }));
              return {
                type: CLNActions.SET_INFO_CLN,
                payload: info ? info : {}
              };
            }
          }),
          catchError((err) => {
            const code = this.commonService.extractErrorCode(err);
            const msg = (code === 503) ? 'Unable to Connect to Core Lightning Server.' : this.commonService.extractErrorMessage(err);
            this.router.navigate(['/error'], { state: { errorCode: code, errorMessage: msg } });
            this.handleErrorWithoutAlert('FetchInfo', UI_MESSAGES.GET_NODE_INFO, 'Fetching Node Info Failed.', { status: code, error: msg });
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  fetchFeeRatesCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_FEE_RATES_CLN),
    mergeMap((action: { type: string, payload: string }) => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchFeeRates' + action.payload, status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post<FeeRates>(this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/feeRates', { style: action.payload }).
        pipe(
          map((feeRates) => {
            this.logger.info(feeRates);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchFeeRates' + action.payload, status: APICallStatusEnum.COMPLETED } }));
            return {
              type: CLNActions.SET_FEE_RATES_CLN,
              payload: feeRates ? feeRates : {}
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('FetchFeeRates' + action.payload, UI_MESSAGES.NO_SPINNER, 'Fetching Fee Rates Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  getNewAddressCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.GET_NEW_ADDRESS_CLN),
    mergeMap((action: { type: string, payload: GetNewAddress }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.GENERATE_NEW_ADDRESS }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.ON_CHAIN_API + '/newaddr', { addresstype: action.payload.addressCode }).
        pipe(
          map((newAddress: any) => {
            this.logger.info(newAddress);
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.GENERATE_NEW_ADDRESS }));
            return {
              type: CLNActions.SET_NEW_ADDRESS_CLN,
              payload: (newAddress && newAddress[action.payload.addressCode]) ? newAddress[action.payload.addressCode] : {}
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('GenerateNewAddress', UI_MESSAGES.GENERATE_NEW_ADDRESS, 'Generate New Address Failed', this.CHILD_API_URL + API_END_POINTS.ON_CHAIN_API, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  setNewAddressCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.SET_NEW_ADDRESS_CLN),
      map((action: { type: string, payload: string }) => {
        this.logger.info(action.payload);
        return action.payload;
      })
    ),
    { dispatch: false }
  );

  peersFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_PEERS_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPeers', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get(this.CHILD_API_URL + API_END_POINTS.PEERS_API).
        pipe(
          map((peers: any) => {
            this.logger.info(peers);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPeers', status: APICallStatusEnum.COMPLETED } }));
            return {
              type: CLNActions.SET_PEERS_CLN,
              payload: peers || []
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('FetchPeers', UI_MESSAGES.NO_SPINNER, 'Fetching Peers Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  saveNewPeerCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SAVE_NEW_PEER_CLN),
    mergeMap((action: { type: string, payload: { id: string } }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.CONNECT_PEER }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewPeer', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post<Peer[]>(this.CHILD_API_URL + API_END_POINTS.PEERS_API, { id: action.payload.id }).
        pipe(
          map((postRes: Peer[]) => {
            this.logger.info(postRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewPeer', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.CONNECT_PEER }));
            this.store.dispatch(setPeers({ payload: (postRes || []) }));
            return {
              type: CLNActions.NEWLY_ADDED_PEER_CLN,
              payload: { peer: postRes.find((peer: Peer) => action.payload.id.indexOf(peer.id ? peer.id : '') === 0) }
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('SaveNewPeer', UI_MESSAGES.CONNECT_PEER, 'Peer Connection Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  detachPeerCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.DETACH_PEER_CLN),
    mergeMap((action: { type: string, payload: DetachPeer }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.DISCONNECT_PEER }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.PEERS_API + '/disconnect', { id: action.payload.id, force: action.payload.force }).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.DISCONNECT_PEER }));
            this.store.dispatch(openSnackBar({ payload: 'Peer Disconnected Successfully!' }));
            return {
              type: CLNActions.REMOVE_PEER_CLN,
              payload: { id: action.payload.id }
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('PeerDisconnect', UI_MESSAGES.DISCONNECT_PEER, 'Unable to Detach Peer. Try again later.', this.CHILD_API_URL + API_END_POINTS.PEERS_API + '/' + action.payload.id, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  channelsFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_CHANNELS_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchChannels', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get<Channel[]>(this.CHILD_API_URL + API_END_POINTS.CHANNELS_API + '/listPeerChannels');
    }),
    map((channels: Channel[]) => {
      this.logger.info(channels);
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchChannels', status: APICallStatusEnum.COMPLETED } }));
      const sortedChannels = { activeChannels: <Channel[]>[], pendingChannels: <Channel[]>[], inactiveChannels: <Channel[]>[] };
      channels.forEach((channel) => {
        if (channel.state === 'CHANNELD_NORMAL') {
          if (channel.peer_connected) {
            sortedChannels.activeChannels.push(channel);
          } else {
            sortedChannels.inactiveChannels.push(channel);
          }
        } else {
          sortedChannels.pendingChannels.push(channel);
        }
      });
      return {
        type: CLNActions.SET_CHANNELS_CLN,
        payload: sortedChannels
      };
    }),
    catchError((err: any) => {
      this.handleErrorWithoutAlert('FetchChannels', UI_MESSAGES.NO_SPINNER, 'Fetching Channels Failed.', err);
      return of({ type: RTLActions.VOID });
    })
  ));

  openNewChannelCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SAVE_NEW_CHANNEL_CLN),
    mergeMap((action: { type: string, payload: SaveChannel }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.OPEN_CHANNEL }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewChannel', status: APICallStatusEnum.INITIATED } }));
      const newPayload = { id: action.payload.peerId, amount: action.payload.amount, feerate: action.payload.feeRate, announce: action.payload.announce };
      if (action.payload.minconf) { newPayload['minconf'] = action.payload.minconf; }
      if (action.payload.utxos) { newPayload['utxos'] = action.payload.utxos; }
      if (action.payload.requestAmount) { newPayload['request_amt'] = action.payload.requestAmount; }
      if (action.payload.compactLease) { newPayload['compact_lease'] = action.payload.compactLease; }
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.CHANNELS_API, newPayload).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewChannel', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.OPEN_CHANNEL }));
            this.store.dispatch(openSnackBar({ payload: 'Channel Added Successfully!' }));
            this.store.dispatch(fetchUTXOBalances());
            return {
              type: CLNActions.FETCH_CHANNELS_CLN
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('SaveNewChannel', UI_MESSAGES.OPEN_CHANNEL, 'Opening Channel Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  updateChannelCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.UPDATE_CHANNEL_CLN),
    mergeMap((action: { type: string, payload: UpdateChannel }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.UPDATE_CHAN_POLICY }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.CHANNELS_API + '/setChannelFee', action.payload).pipe(map((postRes: any) => {
        this.logger.info(postRes);
        this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.UPDATE_CHAN_POLICY }));
        if (action.payload.id === 'all') {
          this.store.dispatch(openSnackBar({ payload: { message: 'All Channels Updated Successfully. Fee policy updates may take some time to reflect on the channel.', duration: 5000 } }));
        } else {
          this.store.dispatch(openSnackBar({ payload: { message: 'Channel Updated Successfully. Fee policy updates may take some time to reflect on the channel.', duration: 5000 } }));
        }
        return {
          type: CLNActions.FETCH_CHANNELS_CLN
        };
      }), catchError((err: any) => {
        this.handleErrorWithAlert('UpdateChannel', UI_MESSAGES.UPDATE_CHAN_POLICY, 'Update Channel Failed', this.CHILD_API_URL + API_END_POINTS.CHANNELS_API, err);
        return of({ type: RTLActions.VOID });
      })
      );
    })
  ));

  closeChannelCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.CLOSE_CHANNEL_CLN),
    mergeMap((action: { type: string, payload: CloseChannel }) => {
      this.store.dispatch(openSpinner({ payload: (action.payload.force ? UI_MESSAGES.FORCE_CLOSE_CHANNEL : UI_MESSAGES.CLOSE_CHANNEL) }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.CHANNELS_API + '/close', { id: action.payload.channelId, unilateraltimeout: action.payload.force ? 1 : null }).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(closeSpinner({ payload: action.payload.force ? UI_MESSAGES.FORCE_CLOSE_CHANNEL : UI_MESSAGES.CLOSE_CHANNEL }));
            this.store.dispatch(fetchChannels());
            this.store.dispatch(fetchUTXOBalances());
            this.store.dispatch(openSnackBar({ payload: 'Channel Closed Successfully!' }));
            return {
              type: CLNActions.REMOVE_CHANNEL_CLN,
              payload: action.payload
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('CloseChannel', (action.payload.force ? UI_MESSAGES.FORCE_CLOSE_CHANNEL : UI_MESSAGES.CLOSE_CHANNEL), 'Unable to Close Channel. Try again later.', this.CHILD_API_URL + API_END_POINTS.CHANNELS_API, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  paymentsFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_PAYMENTS_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPayments', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get<Payment[]>(this.CHILD_API_URL + API_END_POINTS.PAYMENTS_API);
    }),
    map((payments) => {
      this.logger.info(payments);
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPayments', status: APICallStatusEnum.COMPLETED } }));
      return {
        type: CLNActions.SET_PAYMENTS_CLN,
        payload: payments || []
      };
    }),
    catchError((err: any) => {
      this.handleErrorWithoutAlert('FetchPayments', UI_MESSAGES.NO_SPINNER, 'Fetching Payments Failed.', err);
      return of({ type: RTLActions.VOID });
    })
  ));

  fetchOfferInvoiceCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.FETCH_OFFER_INVOICE_CLN),
      mergeMap((action: { type: string, payload: { offer: string, amount_msat?: string } }) => {
        this.store.dispatch(openSpinner({ payload: UI_MESSAGES.FETCH_INVOICE }));
        this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOfferInvoice', status: APICallStatusEnum.INITIATED } }));
        return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.OFFERS_API + '/fetchOfferInvoice', action.payload).
          pipe(
            map((fetchedInvoice: any) => {
              this.logger.info(fetchedInvoice);
              setTimeout(() => {
                this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOfferInvoice', status: APICallStatusEnum.COMPLETED } }));
                this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.FETCH_INVOICE }));
                this.store.dispatch(setOfferInvoice({ payload: (fetchedInvoice ? fetchedInvoice : {}) }));
              }, 500);
            }),
            catchError((err: any) => {
              this.handleErrorWithoutAlert('FetchOfferInvoice', UI_MESSAGES.FETCH_INVOICE, 'Offer Invoice Fetch Failed', err);
              return of({ type: RTLActions.VOID });
            }));
      })),
    { dispatch: false }
  );

  setOfferInvoiceCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.SET_OFFER_INVOICE_CLN),
      map((action: { type: string, payload: OfferInvoice }) => {
        this.logger.info(action.payload);
        return action.payload;
      })
    ),
    { dispatch: false }
  );

  sendPaymentCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.SEND_PAYMENT_CLN),
      mergeMap((action: { type: string, payload: SendPayment }) => {
        this.store.dispatch(openSpinner({ payload: action.payload.uiMessage }));
        this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SendPayment', status: APICallStatusEnum.INITIATED } }));
        return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.PAYMENTS_API, action.payload).pipe(
          map((sendRes: any) => {
            this.logger.info(sendRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SendPayment', status: APICallStatusEnum.COMPLETED } }));
            let snackBarMessageStr = 'Payment Sent Successfully!';
            if (sendRes.saveToDBError) {
              snackBarMessageStr = 'Payment Sent Successfully but Offer Saving to Database Failed.';
            }
            if (sendRes.saveToDBResponse && sendRes.saveToDBResponse !== 'NA') {
              this.store.dispatch(addUpdateOfferBookmark({ payload: sendRes.saveToDBResponse }));
              snackBarMessageStr = 'Payment Sent Successfully and Offer Saved to Database.';
            }
            setTimeout(() => {
              this.store.dispatch(fetchChannels());
              this.store.dispatch(fetchUTXOBalances());
              this.store.dispatch(fetchPayments());
              this.store.dispatch(closeSpinner({ payload: action.payload.uiMessage }));
              this.store.dispatch(openSnackBar({ payload: snackBarMessageStr }));
              this.store.dispatch(sendPaymentStatus({ payload: sendRes.paymentResponse }));
            }, 1000);
          }),
          catchError((err: any) => {
            this.logger.error('Error: ' + JSON.stringify(err));
            if (action.payload.fromDialog) {
              this.handleErrorWithoutAlert('SendPayment', action.payload.uiMessage, 'Send Payment Failed.', err);
            } else {
              this.handleErrorWithAlert('SendPayment', action.payload.uiMessage, 'Send Payment Failed', this.CHILD_API_URL + API_END_POINTS.PAYMENTS_API, err);
            }
            return of({ type: RTLActions.VOID });
          })
        );
      })),
    { dispatch: false }
  );

  queryRoutesFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.GET_QUERY_ROUTES_CLN),
    mergeMap((action: { type: string, payload: GetQueryRoutes }) => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'GetQueryRoutes', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/getRoute', { id: action.payload.destPubkey, amount_msat: action.payload.amount, riskfactor: 0 }).
        pipe(
          map((qrRes: any) => {
            this.logger.info(qrRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'GetQueryRoutes', status: APICallStatusEnum.COMPLETED } }));
            return {
              type: CLNActions.SET_QUERY_ROUTES_CLN,
              payload: qrRes
            };
          }),
          catchError((err: any) => {
            this.store.dispatch(setQueryRoutes({ payload: { route: [] } }));
            this.handleErrorWithAlert('GetQueryRoutes', UI_MESSAGES.NO_SPINNER, 'Get Query Routes Failed', this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/getRoute', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  setQueryRoutesCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.SET_QUERY_ROUTES_CLN),
      map((action: { type: string, payload: QueryRoutes }) => action.payload)
    ),
    { dispatch: false }
  );

  peerLookupCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.PEER_LOOKUP_CLN),
    mergeMap((action: { type: string, payload: string }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.SEARCHING_NODE }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/listNodes', { id: action.payload }).
        pipe(
          map((resPeer) => {
            this.logger.info(resPeer);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.SEARCHING_NODE }));
            return {
              type: CLNActions.SET_LOOKUP_CLN,
              payload: resPeer
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('Lookup', UI_MESSAGES.SEARCHING_NODE, 'Peer Lookup Failed', this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/listNodes/' + action.payload, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  channelLookupCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.CHANNEL_LOOKUP_CLN),
    mergeMap((action: { type: string, payload: ChannelLookup }) => {
      this.store.dispatch(openSpinner({ payload: action.payload.uiMessage }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/listChannels', { short_channel_id: action.payload.shortChannelID }).
        pipe(
          map((resChannel) => {
            this.logger.info(resChannel);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: action.payload.uiMessage }));
            return {
              type: CLNActions.SET_LOOKUP_CLN,
              payload: resChannel
            };
          }),
          catchError((err: any) => {
            if (action.payload.showError) {
              this.handleErrorWithAlert('Lookup', action.payload.uiMessage, 'Channel Lookup Failed', this.CHILD_API_URL + API_END_POINTS.NETWORK_API + '/listChannels/' + action.payload.shortChannelID, err);
            } else {
              this.store.dispatch(closeSpinner({ payload: action.payload.uiMessage }));
            }
            this.store.dispatch(setLookup({ payload: [] }));
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  invoiceLookupCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.INVOICE_LOOKUP_CLN),
    mergeMap((action: { type: string, payload: string }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.SEARCHING_INVOICE }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.INVOICES_API + '/lookup', { label: action.payload }).
        pipe(
          map((resInvoice: any) => {
            this.logger.info(resInvoice);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'Lookup', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.SEARCHING_INVOICE }));
            if (resInvoice.invoices && resInvoice.invoices.length && resInvoice.invoices.length > 0) {
              this.store.dispatch(updateInvoice({ payload: resInvoice.invoices[0] }));
            }
            return {
              type: CLNActions.SET_LOOKUP_CLN,
              payload: resInvoice.invoices && resInvoice.invoices.length && resInvoice.invoices.length > 0 ? resInvoice.invoices[0] : resInvoice
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('Lookup', UI_MESSAGES.SEARCHING_INVOICE, 'Invoice Lookup Failed', err);
            this.store.dispatch(openSnackBar({ payload: { message: 'Invoice Refresh Failed.', type: 'ERROR' } }));
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  setLookupCL = createEffect(
    () => this.actions.pipe(
      ofType(CLNActions.SET_LOOKUP_CLN),
      map((action: { type: string, payload: any }) => {
        this.logger.info(action.payload);
        return action.payload;
      })
    ),
    { dispatch: false }
  );

  fetchForwardingHistoryCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.GET_FORWARDING_HISTORY_CLN),
    mergeMap((action: { type: string, payload: { status: string } }) => {
      const statusInitial = action.payload.status.charAt(0).toUpperCase();
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchForwardingHistory' + statusInitial, status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.CHANNELS_API + '/listForwards', action.payload).
        pipe(
          map((fhRes: any) => {
            this.logger.info(fhRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchForwardingHistory' + statusInitial, status: APICallStatusEnum.COMPLETED } }));
            if (action.payload.status === CLNForwardingEventsStatusEnum.FAILED) {
              this.store.dispatch(setForwardingHistory({ payload: { status: CLNForwardingEventsStatusEnum.FAILED, totalForwards: fhRes.length, listForwards: fhRes } }));
            } else if (action.payload.status === CLNForwardingEventsStatusEnum.LOCAL_FAILED) {
              this.store.dispatch(setForwardingHistory({ payload: { status: CLNForwardingEventsStatusEnum.LOCAL_FAILED, totalForwards: fhRes.length, listForwards: fhRes } }));
            } else if (action.payload.status === CLNForwardingEventsStatusEnum.SETTLED) {
              this.store.dispatch(setForwardingHistory({ payload: { status: CLNForwardingEventsStatusEnum.SETTLED, totalForwards: fhRes.length, listForwards: fhRes } }));
            }
            return { type: RTLActions.VOID };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('FetchForwardingHistory' + statusInitial, UI_MESSAGES.NO_SPINNER, 'Get ' + action.payload.status + ' Forwarding History Failed', this.CHILD_API_URL + API_END_POINTS.CHANNELS_API + '/listForwards', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  deleteExpiredInvoiceCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.DELETE_EXPIRED_INVOICE_CLN),
    mergeMap((action: { type: string, payload: number }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.DELETE_INVOICE }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.INVOICES_API + '/delete', { subsystem: 'expiredinvoices', age: SECS_IN_YEAR }).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.DELETE_INVOICE }));
            this.store.dispatch(openSnackBar({ payload: postRes.status }));
            return { type: CLNActions.FETCH_INVOICES_CLN };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('DeleteInvoices', UI_MESSAGES.DELETE_INVOICE, 'Delete Invoice Failed', this.CHILD_API_URL + API_END_POINTS.INVOICES_API, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  saveNewInvoiceCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SAVE_NEW_INVOICE_CLN),
    mergeMap((action: { type: string, payload: { amount_msat: number, label: string, description: string, expiry: number, exposeprivatechannels: boolean } }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.ADD_INVOICE }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewInvoice', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.INVOICES_API, action.payload).
        pipe(
          map((postRes: Invoice) => {
            this.logger.info(postRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewInvoice', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.ADD_INVOICE }));
            postRes.amount_msat = action.payload.amount_msat;
            postRes.label = action.payload.label;
            postRes.expires_at = Math.round((new Date().getTime() / 1000) + action.payload.expiry);
            postRes.description = action.payload.description;
            postRes.status = 'unpaid';
            setTimeout(() => {
              this.store.dispatch(openAlert({
                payload: {
                  data: {
                    invoice: postRes,
                    newlyAdded: true,
                    component: CLNInvoiceInformationComponent
                  }
                }
              }));
            }, 200);
            return {
              type: CLNActions.ADD_INVOICE_CLN,
              payload: postRes
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('SaveNewInvoice', UI_MESSAGES.ADD_INVOICE, 'Add Invoice Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  saveNewOfferCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SAVE_NEW_OFFER_CLN),
    mergeMap((action: { type: string, payload: { amount: string, description: string, issuer: string } }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.CREATE_OFFER }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewOffer', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.OFFERS_API, action.payload).pipe(map((postRes: Offer) => {
        this.logger.info(postRes);
        this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SaveNewOffer', status: APICallStatusEnum.COMPLETED } }));
        this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.CREATE_OFFER }));
        setTimeout(() => {
          this.store.dispatch(openAlert({
            payload: {
              data: {
                offer: postRes,
                newlyAdded: true,
                component: CLNOfferInformationComponent
              }
            }
          }));
        }, 100);
        return {
          type: CLNActions.ADD_OFFER_CLN,
          payload: postRes
        };
      }), catchError((err: any) => {
        this.handleErrorWithoutAlert('SaveNewOffer', UI_MESSAGES.CREATE_OFFER, 'Create Offer Failed.', err);
        return of({ type: RTLActions.VOID });
      })
      );
    })
  ));

  invoicesFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_INVOICES_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchInvoices', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post<ListInvoices>(this.CHILD_API_URL + API_END_POINTS.INVOICES_API + '/lookup', null);
    }),
    map((res: ListInvoices) => {
      this.logger.info(res);
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchInvoices', status: APICallStatusEnum.COMPLETED } }));
      return {
        type: CLNActions.SET_INVOICES_CLN,
        payload: res
      };
    }),
    catchError((err: any) => {
      this.handleErrorWithoutAlert('FetchInvoices', UI_MESSAGES.NO_SPINNER, 'Fetching Invoices Failed.', err);
      return of({ type: RTLActions.VOID });
    })
  ));

  offersFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_OFFERS_CLN),
    mergeMap((action: { type: string, payload: any }) => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOffers', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get(this.CHILD_API_URL + API_END_POINTS.OFFERS_API).
        pipe(map((res: any) => {
          this.logger.info(res);
          this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOffers', status: APICallStatusEnum.COMPLETED } }));
          return {
            type: CLNActions.SET_OFFERS_CLN,
            payload: res.offers ? res.offers : []
          };
        }), catchError((err: any) => {
          this.handleErrorWithoutAlert('FetchOffers', UI_MESSAGES.NO_SPINNER, 'Fetching Offers Failed.', err);
          return of({ type: RTLActions.VOID });
        }));
    })
  ));

  offersDisableCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.DISABLE_OFFER_CLN),
    mergeMap((action: { type: string, payload: { offer_id: string } }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.DISABLE_OFFER }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'DisableOffer', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.OFFERS_API + '/disableOffer', { offer_id: action.payload.offer_id }).
        pipe(map((postRes: any) => {
          this.logger.info(postRes);
          this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'DisableOffer', status: APICallStatusEnum.COMPLETED } }));
          this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.DISABLE_OFFER }));
          this.store.dispatch(openSnackBar({ payload: 'Offer Disabled Successfully!' }));
          return {
            type: CLNActions.UPDATE_OFFER_CLN,
            payload: { offer: postRes }
          };
        }), catchError((err: any) => {
          this.handleErrorWithoutAlert('DisableOffer', UI_MESSAGES.DISABLE_OFFER, 'Disabling Offer Failed.', err);
          return of({ type: RTLActions.VOID });
        }));
    })
  ));

  offerBookmarksFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_OFFER_BOOKMARKS_CLN),
    mergeMap((action: { type: string, payload: any }) => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOfferBookmarks', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get(this.CHILD_API_URL + API_END_POINTS.OFFERS_API + '/offerbookmarks').
        pipe(map((res: any) => {
          this.logger.info(res);
          this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchOfferBookmarks', status: APICallStatusEnum.COMPLETED } }));
          return {
            type: CLNActions.SET_OFFER_BOOKMARKS_CLN,
            payload: res || []
          };
        }), catchError((err: any) => {
          this.handleErrorWithoutAlert('FetchOfferBookmarks', UI_MESSAGES.NO_SPINNER, 'Fetching Offer Bookmarks Failed.', err);
          return of({ type: RTLActions.VOID });
        }));
    })
  ));

  peidOffersDeleteCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.DELETE_OFFER_BOOKMARK_CLN),
    mergeMap((action: { type: string, payload: { bolt12: string } }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.DELETE_OFFER_BOOKMARK }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'DeleteOfferBookmark', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.OFFERS_API + '/offerbookmark/delete', { offer_str: action.payload.bolt12 }).
        pipe(map((postRes: any) => {
          this.logger.info(postRes);
          this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'DeleteOfferBookmark', status: APICallStatusEnum.COMPLETED } }));
          this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.DELETE_OFFER_BOOKMARK }));
          this.store.dispatch(openSnackBar({ payload: 'Offer Bookmark Deleted Successfully!' }));
          return {
            type: CLNActions.REMOVE_OFFER_BOOKMARK_CLN,
            payload: { bolt12: action.payload.bolt12 }
          };
        }), catchError((err: any) => {
          this.handleErrorWithAlert('DeleteOfferBookmark', UI_MESSAGES.DELETE_OFFER_BOOKMARK, 'Deleting Offer Bookmark Failed.', this.CHILD_API_URL + API_END_POINTS.OFFERS_API + '/offerbookmark/' + action.payload.bolt12, err);
          return of({ type: RTLActions.VOID });
        }));
    })
  ));

  SetChannelTransactionCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SET_CHANNEL_TRANSACTION_CLN),
    mergeMap((action: { type: string, payload: OnChain }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.SEND_FUNDS }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SetChannelTransaction', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(this.CHILD_API_URL + API_END_POINTS.ON_CHAIN_API, action.payload).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SetChannelTransaction', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.SEND_FUNDS }));
            this.store.dispatch(fetchUTXOBalances());
            return {
              type: CLNActions.SET_CHANNEL_TRANSACTION_RES_CLN,
              payload: postRes
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithoutAlert('SetChannelTransaction', UI_MESSAGES.SEND_FUNDS, 'Sending Fund Failed.', err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  utxoBalancesFetch = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_UTXO_BALANCES_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchUTXOBalances', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get(this.CHILD_API_URL + API_END_POINTS.ON_CHAIN_API + '/utxos');
    }),
    map((utxoBalances: any) => {
      this.logger.info(utxoBalances);
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchUTXOBalances', status: APICallStatusEnum.COMPLETED } }));
      return {
        type: CLNActions.SET_UTXO_BALANCES_CLN,
        payload: utxoBalances
      };
    }),
    catchError((err: any) => {
      this.handleErrorWithoutAlert('FetchUTXOBalances', UI_MESSAGES.NO_SPINNER, 'Fetching UTXO and Balances Failed.', err);
      return of({ type: RTLActions.VOID });
    })
  ));

  pageSettingsFetchCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.FETCH_PAGE_SETTINGS_CLN),
    mergeMap(() => {
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPageSettings', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.get(API_END_POINTS.PAGE_SETTINGS_API).pipe(
        map((pageSettings: any) => {
          this.logger.info(pageSettings);
          this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'FetchPageSettings', status: APICallStatusEnum.COMPLETED } }));
          return {
            type: CLNActions.SET_PAGE_SETTINGS_CLN,
            payload: pageSettings || []
          };
        }),
        catchError((err: any) => {
          this.handleErrorWithoutAlert('FetchPageSettings', UI_MESSAGES.NO_SPINNER, 'Fetching Page Settings Failed.', err);
          return of({ type: RTLActions.VOID });
        })
      );
    })
  ));

  savePageSettingsCL = createEffect(() => this.actions.pipe(
    ofType(CLNActions.SAVE_PAGE_SETTINGS_CLN),
    mergeMap((action: { type: string, payload: any }) => {
      this.store.dispatch(openSpinner({ payload: UI_MESSAGES.UPDATE_PAGE_SETTINGS }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SavePageSettings', status: APICallStatusEnum.INITIATED } }));
      return this.httpClient.post(API_END_POINTS.PAGE_SETTINGS_API, action.payload).
        pipe(
          map((postRes: any) => {
            this.logger.info(postRes);
            this.store.dispatch(updateCLNAPICallStatus({ payload: { action: 'SavePageSettings', status: APICallStatusEnum.COMPLETED } }));
            this.store.dispatch(closeSpinner({ payload: UI_MESSAGES.UPDATE_PAGE_SETTINGS }));
            this.store.dispatch(openSnackBar({ payload: 'Page Layout Updated Successfully!' }));
            return {
              type: CLNActions.SET_PAGE_SETTINGS_CLN,
              payload: postRes || []
            };
          }),
          catchError((err: any) => {
            this.handleErrorWithAlert('SavePageSettings', UI_MESSAGES.UPDATE_PAGE_SETTINGS, 'Page Settings Update Failed.', API_END_POINTS.PAGE_SETTINGS_API, err);
            return of({ type: RTLActions.VOID });
          })
        );
    })
  ));

  initializeRemainingData(info: any, landingPage: string) {
    this.sessionService.setItem('clnUnlocked', 'true');
    const node_data = {
      identity_pubkey: info.id,
      alias: info.alias,
      testnet: (info.network.toLowerCase() === 'testnet'),
      chains: info.chains,
      uris: info.uris,
      version: info.version,
      api_version: info.api_version,
      numberOfPendingChannels: info.num_pending_channels
    };
    this.store.dispatch(openSpinner({ payload: UI_MESSAGES.INITALIZE_NODE_DATA }));
    this.store.dispatch(setNodeData({ payload: node_data }));
    let newRoute = this.location.path();
    if (newRoute.includes('/lnd/')) {
      newRoute = newRoute?.replace('/lnd/', '/cln/');
    } else if (newRoute.includes('/ecl/')) {
      newRoute = newRoute?.replace('/ecl/', '/cln/');
    }
    if (newRoute.includes('/login') || newRoute.includes('/error') || newRoute === '' || landingPage === 'HOME' || newRoute.includes('?access-key=')) {
      newRoute = '/cln/home';
    }
    this.router.navigate([newRoute]);
    this.store.dispatch(fetchInvoices());
    this.store.dispatch(fetchChannels());
    this.store.dispatch(fetchUTXOBalances());
    this.store.dispatch(fetchFeeRates({ payload: 'perkw' }));
    this.store.dispatch(fetchFeeRates({ payload: 'perkb' }));
    this.store.dispatch(fetchPeers());
    this.store.dispatch(fetchPayments());
  }

  handleErrorWithoutAlert(actionName: string, uiMessage: string, genericErrorMessage: string, err: { status: number, error: any }) {
    this.logger.error('ERROR IN: ' + actionName + '\n' + JSON.stringify(err));
    if (err.status === 401) {
      this.logger.info('Redirecting to Login');
      this.store.dispatch(closeAllDialogs());
      this.store.dispatch(logout({ payload: 'Authentication Failed: ' + JSON.stringify(err.error) }));
    } else {
      this.store.dispatch(closeSpinner({ payload: uiMessage }));
      const errMsg = this.commonService.extractErrorMessage(err, genericErrorMessage);
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: actionName, status: APICallStatusEnum.ERROR, statusCode: err.status.toString(), message: errMsg } }));
    }
  }

  handleErrorWithAlert(actionName: string, uiMessage: string, alertTitle: string, errURL: string, err: { status: number, error: any }) {
    this.logger.error(err);
    if (err.status === 401) {
      this.logger.info('Redirecting to Login');
      this.store.dispatch(closeAllDialogs());
      this.store.dispatch(logout({ payload: 'Authentication Failed: ' + JSON.stringify(err.error) }));
      this.store.dispatch(openSnackBar({ payload: 'Authentication Failed: ' + err.error }));
    } else {
      this.store.dispatch(closeSpinner({ payload: uiMessage }));
      const errMsg = this.commonService.extractErrorMessage(err);
      this.store.dispatch(openAlert({
        payload: {
          data: {
            type: 'ERROR',
            alertTitle: alertTitle,
            message: { code: err.status, message: errMsg, URL: errURL },
            component: ErrorMessageComponent
          }
        }
      }));
      this.store.dispatch(updateCLNAPICallStatus({ payload: { action: actionName, status: APICallStatusEnum.ERROR, statusCode: err.status.toString(), message: errMsg, URL: errURL } }));
    }
  }

  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next(<any>null);
      completeSub.complete();
    });
  }

}
