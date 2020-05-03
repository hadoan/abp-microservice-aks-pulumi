import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { DeploymentConsts } from '../common/consts';

export const dbUserName = "sql";
export const dbUserPwd = "MicroserviceDemo@123!!";

export function newSqlServer(resourceGroup: azure.core.ResourceGroup) {
    const serverName = DeploymentConsts.APP_NAME + "-sql-server";
    return new azure.sql.SqlServer(serverName, {
        name: serverName,
        resourceGroupName: resourceGroup.name,
        administratorLogin: dbUserName,
        administratorLoginPassword: dbUserPwd,
        version: "12.0",
    });
}

export function newIdentityDb(resourceGroup: azure.core.ResourceGroup, sqlServer: azure.sql.SqlServer) {
    return new azure.sql.Database("identity-db", {
        name: 'identity-db',
        resourceGroupName: resourceGroup.name,
        serverName: sqlServer.name,
        requestedServiceObjectiveName: "S0"
    });
}


export function newProductDb(resourceGroup: azure.core.ResourceGroup, sqlServer: azure.sql.SqlServer) {
    return new azure.sql.Database("product-db", {
        name: 'product-db',
        resourceGroupName: resourceGroup.name,
        serverName: sqlServer.name,
        requestedServiceObjectiveName: "S0"
    });
}
