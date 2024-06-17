const crypto = require('crypto');

export const generateRandomString = (length = 6): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(6, (err, buff) => {
      if (err) reject(err);
      resolve(buff.toString('hex').slice(0, length));
    });
  });
