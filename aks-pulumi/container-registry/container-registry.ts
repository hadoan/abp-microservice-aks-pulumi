import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

export function newContainerRegistry(resourceGroup: azure.core.ResourceGroup){
    const registry = new azure.containerservice.Registry("DemoMicroserviceRegistry", {
        name: "DemoMicroserviceRegistry",
        resourceGroupName: resourceGroup.name,
        sku: "basic",
        adminEnabled: true
    });
}