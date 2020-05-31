import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import { DeploymentConsts } from '../common/consts';
import * as config from '../common/config';
import * as k8s from "@pulumi/kubernetes";

export function newElasticSearch() {
    const rabbitMq = new k8s.helm.v2.Chart("elasticsearch", {
        chart: 'elasticsearch',
        fetchOpts: { repo: "https://helm.elastic.co" }
    });
}