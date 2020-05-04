import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { DeploymentConsts } from './common/consts';
import * as sql from './databases/sql-deployments';
import * as aks from './aks/aks-deployment';
import * as registry from './container-registry/container-registry';


const resourceGroupName = "resource-group-" + DeploymentConsts.APP_NAME;
const resourceGroup = new azure.core.ResourceGroup(resourceGroupName, {
    name: resourceGroupName,
    location: "SoutheastAsia"
});

//Deploy database
// const sqlServer = sql.newSqlServer(resourceGroup);
// const identityDb = sql.newIdentityDb(resourceGroup, sqlServer);
// const productDb = sql.newProductDb(resourceGroup, sqlServer);

//Deploy container registry
const containerRegistry = registry.newContainerRegistry(resourceGroup);

//Deploy AKS
const aksCluster = aks.newAks(resourceGroup);



// Export the connection string for the storage account
export const appResourceGroupName = resourceGroupName;
