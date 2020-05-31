import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import { DeploymentConsts } from '../common/consts';
import * as config from '../common/config';
import * as k8s from "@pulumi/kubernetes";

export function newMongodb() {
    const rabbitMq = new k8s.helm.v2.Chart("mongodb", {
        chart: 'mongodb',
        fetchOpts: { repo: "https://charts.bitnami.com/bitnami"},
        values: {
            mongodbUsername: 'user',
            mongodbPassword: '!!MicroserviceDemo@1111!!',
            mongodbDatabase: 'MsDemo_Blogging'
        }
    });
}