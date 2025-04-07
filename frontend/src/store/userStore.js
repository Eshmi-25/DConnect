// store/userStore.js
import { proxy } from 'valtio';

const userStore = proxy({
  userName: "",
  setUserId: (name) => {
    userStore.userName = name;
  },
});

export default userStore;
