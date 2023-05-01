import md5 from "md5";

import config from "../config.js";

export default (email) => `https://gravatar.com/avatar/${md5(email)}?d=${config.defaultAvatar}`;