Contract methods:

Create

```
npx near call $(cat neardev/dev-account) create '{"task":"YOUR_TASK"}' --accountId YOUR_ACCOUNT_ID.testnet
```

Get - returns paginated results

```
npx near view $(cat neardev/dev-account) get '{"offset":0}' --accountId YOUR_ACCOUNT_ID.testnet
```

GetById - returns a single todo

```
npx near view $(cat neardev/dev-account) getById '{"id":TASK_ID}' --accountId YOUR_ACCOUNT_ID.testnet
```

Update - updates a single todo

```
npx near call $(cat neardev/dev-account) update '{"id":TASK_ID, "updates":{"done":true, "task":"Drink coffee"} }' --accountId YOUR_ACCOUNT_ID.testnet
```

Delete - deletes a single todo

```
npx near call $(cat neardev/dev-account) del '{"id":TASK_ID }' --accountId YOUR_ACCOUNT_ID.testnet
```

