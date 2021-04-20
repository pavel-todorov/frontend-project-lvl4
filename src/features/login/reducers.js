import { handleActions } from 'redux-actions';

import { setModalState } from './actions.js'

const defaultState = {
  modalMessage: '',
  showModal: false,
};

const setModalStateHandler = (state, { payload: { showModal, message } }) => {
  console.log(`Login::reducers::setModalStateHandler(state = ${JSON.stringify(state)}, message = ${message}, showModal = ${showModal}): result: ${JSON.stringify({ modalMessage: message, showModal })}`);
  return { modalMessage: message, showModal };
};

const handlers = {
  [setModalState]: setModalStateHandler,
};

export default handleActions(handlers, defaultState);
