const { createClient, defineScript } = require('redis');

const client = createClient({

});


(async function () {
    await client.connect();

    await client.set('key', '1');
    await client.add('key', 2); // 3
  })();
