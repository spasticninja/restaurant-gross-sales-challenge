We have large customers with thousands of restaurants across the country. Those restaurants are represented in hierarchies, like so:

Big Restaurant Co.
 - East Coast
   - Restaurant 1
   - Restaurant 2
 - West Coast
   - California
     - Southern California
       - Restaurant 3
     - Northern California
       - Restaurant 4
   - Washington
     - Restaurant 5
     - Restaurant 6

A node in the hierarchy can represent a restaurant or a group of restaurants. We'll refer to restaurants as "stores" and groups as "groups". Everything in the hierarchy above with a name that starts with "Restaurant" is a store (ex. "Restaurant 3"). Everything else is a group (ex. "Washington"). Groups are made up of stores and/or other groups.

We process a lot of data from each restaurant. Some of this data we get from the Point of Sale (POS) systems at the stores. We get incremental updates and end of day summaries for items sold at each restaurant.

For this fictional problem, we will provide you with some mock data, that includes:

1. A store hierarchy
2. Gross sales for stores in the hierarchy

Using this data we would like you to implement the following:

Write a function that takes a node ID for a store or group in the hierarchy and a date. We would like you to return each node in the hierarchy and the total gross sales for that node on the specified date. For groups the total gross sales should be the sum of the gross sales for all groups and stores below it. You can find an example of the output we are expecting in `snapshots/grossSales11.json`. It looks like this:

```
{
  "name": "East Coast",
  "children": [
    {
      "name": "Boston Restaurant",
      "total": 12540.12
    },
    {
      "name": "New York Restaurant",
      "total": 4641.23
    }
  ],
  "total": 17181.35
}
```

Note: the example above only goes one-level deep, but the second example has multiple levels. Here is an example (the entire expected output is in `snapshots/grossSales12.json`):

```
{
  "name": "West Coast",
  "children": [
    {
      "name": "California",
      "children": [
        {
          "name": "Southern California",
          "children": [
            {
              "name": "LA Restaurant",
              "total": 20229.98
            },
            {
              "name": "San Diego Restaurant",
              "total": 17777.76
            }
          ],
          "total": 38007.74
        },
        ...
```

We have stubbed out the function for you in `index.js` as so:

```
async function getGrossSales(nodeId, date) {
    // TODO:
    return {}
}
```

You have to fill in the details.

Available to you in `index.js` is a function called getStoreHierarchy to retrieve the hierarchy and getStoreSales to retrieve the sales. The data is defined in JSON files in the data folder.

We have provided two examples that when run should match the output in the snapshots folder:

```
getGrossSales(11, '2018-07-31').then(grossSales => {;
    console.log("getGrossSales node 11 OK = " + _isEqual(grossSales,grossSalesSnapshot11));
});

getGrossSales(12, '2018-08-01').then(grossSales => {;
    console.log("getGrossSales node 12 OK = " + _isEqual(grossSales,grossSalesSnapshot12));
});
```

## Getting Started

```
npm install
npm start
```

Good luck!
