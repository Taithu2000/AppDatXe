export const ROLES = 'ROLES';

export const setRoles = role => dispatch => {
  dispatch({
    type: ROLES,
    payload: role,
  });
};
