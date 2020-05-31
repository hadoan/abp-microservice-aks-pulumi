import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import * as config from '../common/config';
import * as k8s from "@pulumi/kubernetes";

export function newRedis() {
    const redis = new k8s.helm.v2.Chart("redis", {
        fetchOpts: { repo: "https://charts.bitnami.com/bitnami" },
        chart: 'redis'
    });
}