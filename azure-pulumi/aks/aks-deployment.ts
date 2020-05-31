import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import { DeploymentConsts } from '../common/consts';
import * as config from '../common/config';

//create Azure AD Application for AKS
export function newAks(resourceGroup: azure.core.ResourceGroup) {
    const adApp = new azuread.Application(DeploymentConsts.APP_NAME + '-ad-app');
    const adSp = new azuread.ServicePrincipal(DeploymentConsts.APP_NAME + "-aksSp", { applicationId: adApp.applicationId });
    const adSpPassword = new azuread.ServicePrincipalPassword("aksSpPassword", {
        servicePrincipalId: adSp.id,
        value: config.aksPassword,
        endDate: "2099-01-01T00:00:00Z",
    });

    // Create the individual clusters
    const cluster = new azure.containerservice.KubernetesCluster(`demo-aksCluster`, {
        // Global config arguments
        resourceGroupName: resourceGroup.name,
        linuxProfile: {
            adminUsername: "aksuser",
            sshKey: {
                keyData: config.sshPublicKey,
            },
        },
        servicePrincipal: {
            clientId: adApp.applicationId,
            clientSecret: adSpPassword.value,
        },
        // Per-cluster config arguments
        location: azure.Locations.SouthEastAsia,
        defaultNodePool: {
            name: "aksagentpool",
            nodeCount: 3,
            vmSize: 'Standard_D2_v2',
        },
        dnsPrefix: `${pulumi.getStack()}-kube`,
    });
    return cluster;

}
