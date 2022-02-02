import {LOGOUT, SAVE, UPDATE_AVATAR} from "./constant";

const initState = {
  user_name: localStorage.getItem('user_name'),
  phone_number: localStorage.getItem('phone_number'),
  stu_number: localStorage.getItem('stu_number'),
  authority: parseInt(localStorage.getItem('authority') || '-1'),
  token: localStorage.getItem('token'),
  avatar: localStorage.getItem('avatar'),
}

const actions = {
  logout: () => ({type: LOGOUT}),
  save: (data: any) => ({type: SAVE, data}),
  updateAvatar: (avatar: string) => ({type: UPDATE_AVATAR, payload: avatar}),
}

const userReducer = (state: any = initState, action: any) => {
  const {type,data}=action;
  switch (type) {
    case SAVE:
      const {user_name, phone_number, avatar, stu_number, authority, token,} = data;
      state.user_name = user_name;
      state.phone_number = phone_number;
      state.stu_number = stu_number;
      state.authority = authority;
      state.token = token;
      state.avatar = avatar + '?ran=' + Math.random();
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('stu_number', stu_number);
      localStorage.setItem('authority', authority);
      localStorage.setItem('token', token);
      localStorage.setItem('avatar', avatar);
      return {...state};

    case LOGOUT:
      state.user_name = null;
      state.phone_number = null;
      state.stu_number = null;
      state.authority = -1;
      state.token = null;
      state.avatar = null;

      localStorage.removeItem('user_name');
      localStorage.removeItem('phone_number');
      localStorage.removeItem('stu_number');
      localStorage.removeItem('authority');
      localStorage.removeItem('avatar');
      localStorage.removeItem('token');
      return {...state};

    case UPDATE_AVATAR:
      state.avatar = data;
      localStorage.setItem('avatar', data);
      return {...state, avatar: data};
    default:
      return state;
  }
}
export const {logout, save, updateAvatar} = actions
export default userReducer;
