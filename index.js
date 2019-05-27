// NOTE: lodash is only used to compare your results with the snapshots
// There is no requirement to use (or not use) lodash
// That decision is completely up to you
const _isEqual = require('lodash/isEqual');
const grossSalesSnapshot11 = require('./snapshots/grossSales11.json');
const grossSalesSnapshot12 = require('./snapshots/grossSales12.json');
const { getStoreHierarchy, getStoreSales } = require('./api');

async function getGrossSales(nodeId, date) {
    let storeHierarchy = await getStoreHierarchy();
    let storeSales = await getStoreSales();

    // Find node by ID
    let nodeRegion = await nodeGroup(storeHierarchy.children, nodeId);

    // Getting sales by id and storing in and object with store id as key.
    let filteredSales = salesNode(storeSales, date);

    // Time to get my sums!
    let grossSalesObject = nodeSales(nodeRegion, filteredSales, nodeId);

    return grossSalesObject;
}

async function nodeGroup(region, nodeId) {
  // Function looks through and finds the location that matches an id, returns that region/subregion/store
  let group = {};

  region.forEach((subRegion) => {
    if (subRegion.id === nodeId) {
      // Debug to make sure returns correct ID (this will return store as well if that id is provided)
      // console.log(subRegion)
      group = subRegion;
    } else if (subRegion.children) {
      // Only go into subregion if there are children items/nodes
      let subGroup = nodeGroup(subRegion.children, nodeId);

      if (subGroup) {
        return subGroup;
      }
    }
  });

  return group;
};

function salesNode(storeSales, date) {
  // Need to loop through store sales and find dates and Ids.
  // Storing store data in an object so I can more easily use the store's id as the object keys.
  let filteredSales = {};

  storeSales.forEach((store) => {
    if (store.businessDay === date) {
      filteredSales[store.storeId] = store;
    }
  });

  return filteredSales;
};

// ran out of time, the idea was to use some logic ssimilar to nodeGroup, but create a new object. I was just trying to come up with the best approach for summing the sales that didn't involve x-nested for loops.
function nodeSales(node, sales, nodeId) {
  let storeGrossSales = {};
  console.log(node);

  if (!node.children || node.children.length > 0) {
    // If there are no children return shortened object
    return { "name": node.name, "total": sales[node.id] };
  }

  let grossSum = 0;
  storeGrossSales.children.forEach((subRegion, index) => {
    let subRegionDetails = { "name": subRegion.name };

    if (subRegion.children && subRegion.children.length > 0) {
      subRegionDetails['children'] = [];
    }

    return subRegionDetails;
  });
}

// for my own debugging
// console.log(getGrossSales(12, '2018-08-01'));


// *****
// Tests
// -----
// Expected Output:
// getGrossSales node 11 OK = true
// getGrossSales node 12 OK = true
// **************************************

getGrossSales(11, '2018-07-31').then(grossSales => {
    console.log("getGrossSales node 11 OK = " + _isEqual(grossSales,grossSalesSnapshot11));
});

getGrossSales(12, '2018-08-01').then(grossSales => {
    console.log("getGrossSales node 12 OK = " + _isEqual(grossSales,grossSalesSnapshot12));
});
