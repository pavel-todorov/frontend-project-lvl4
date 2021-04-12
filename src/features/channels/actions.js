import { createAction } from 'redux-actions';

export const channelsRequest = createAction('CHANNELS_UPDATE_REQUEST');
export const channelsSuccess = createAction('CHANNELS_UPDATE_SUCCESS');
export const channelsFailure = createAction('CHANNELS_UPDATE_FAILURE');
