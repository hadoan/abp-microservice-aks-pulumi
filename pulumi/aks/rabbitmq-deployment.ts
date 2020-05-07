import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import * as config from '../common/config';
import * as k8s from "@pulumi/kubernetes";

export function newRabbitMq() {
    const rabbitMq = new k8s.helm.v2.Chart("rabbitmq", {
        fetchOpts: { repo: "https://charts.bitnami.com/bitnami" },
        chart: 'rabbitmq',
        values: {
            rabbitMq: {
                username: 'user',
                password: '!!MicroserviceDemo@1111!!'
            }
        }
    });
}