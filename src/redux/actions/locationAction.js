export const SELECT_START_POINT = 'SELECT_START_POINT';
export const SELECT_END_POINT = 'SELECT_END_POINT';
export const SELECT_DATE = 'SELECT_DATE';


export const selectStartPoint = start => dispatch => {
  dispatch({
    type: SELECT_START_POINT,
    payload: start,
  });
};

export const selectEndPoint = end => dispatch => {
  dispatch({
    type: SELECT_END_POINT,
    payload: end,
  });
};

export const selectDateAction = date => dispatch => {
  dispatch({
    type: SELECT_DATE,
    payload: date,
  });
};
