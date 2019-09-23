1. Installation
**`yarn add  serverless --global`**
**`yarn install`**

2. Testing
- Create
**`sls invoke local -f createProduct -p events/createProduct.json `**

- Read
**`sls invoke local -f readProduct -p events/readProduct.json`**

- Update
**`sls invoke local -f updateProduct -p updateProduct.json`**

- Delete
**`sls invoke local -f deleteProduct -p events/deleteProduct.json`**

You can edit the files in the events folder to adjust the data
