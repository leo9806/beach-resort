import {createClient} from 'contentful';

require('dotenv').config();

// accessing the contentful api
export default createClient({
  space: "13jv0e7zcnb8",
  accessToken: "yeSFBDTSj6TT4VDp56wi3nw-bBzt5kNwpZmDDxWjRHE"
});