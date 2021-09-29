import crypto from 'crypto';

const keyLength = 20;

const getKeyList = () => crypto.randomBytes(keyLength).toString('hex');

export default { getKeyList };
