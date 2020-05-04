import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import * as azuread from "@pulumi/azuread";
import { DeploymentConsts } from '../common/consts';
import * as config from '../common/config';
import * as k8s from "@pulumi/kubernetes";

export function newRedis(resourceGroup: azure.core.ResourceGroup) {

    // REDIS MASTER
    let redisMasterLabels = { app: "redis", tier: "backend", role: "master" };
    let redisMasterService = new k8s.core.v1.Service("redis-master", {
        metadata: {
            name: "redis-master",
            labels: redisMasterLabels,
        },
        spec: {
            ports: [{ port: 6379, targetPort: 6379 }],
            selector: redisMasterLabels,
        },
    });
    let redisMasterDeployment = new k8s.apps.v1.Deployment("redis-master", {
        metadata: { name: "redis-master" },
        spec: {
            selector: { matchLabels: redisMasterLabels },
            replicas: 1,
            template: {
                metadata: { labels: redisMasterLabels },
                spec: {
                    containers: [{
                        name: "master",
                        image: "k8s.gcr.io/redis:e2e",
                        resources: {
                            requests: {
                                cpu: "100m",
                                memory: "100Mi",
                            },
                        },
                        ports: [{ containerPort: 6379 }],
                    }],
                },
            },
        },
    });

    // REDIS SLAVE
    let redisSlaveLabels = { app: "redis", tier: "backend", role: "slave" };
    let redisSlaveService = new k8s.core.v1.Service("redis-slave", {
        metadata: {
            name: "redis-slave",
            labels: redisSlaveLabels,
        },
        spec: {
            ports: [{ port: 6379, targetPort: 6379 }],
            selector: redisSlaveLabels,
        },
    });
    let redisSlaveDeployment = new k8s.apps.v1.Deployment("redis-slave", {
        metadata: { name: "redis-slave" },
        spec: {
            selector: { matchLabels: redisSlaveLabels },
            replicas: 1,
            template: {
                metadata: { labels: redisSlaveLabels },
                spec: {
                    containers: [{
                        name: "slave",
                        image: "gcr.io/google_samples/gb-redisslave:v1",
                        resources: {
                            requests: {
                                cpu: "100m",
                                memory: "100Mi",
                            },
                        },
                        env: [{
                            name: "GET_HOSTS_FROM",
                            value: "dns",
                            // Using `GET_HOSTS_FROM=dns` requires your cluster to provide a dns service. As of
                            // Kubernetes 1.3, DNS is a built-in service launched automatically. However, if the
                            // cluster you are using does not have a built-in DNS service, you can instead access an
                            // environment variable to find the master service's host. To do so, comment out the
                            // 'value: "dns"' line above, and uncomment the line below:
                            // value: "env",
                        }],
                        ports: [{ containerPort: 6379 }],
                    }],
                },
            },
        },
    });

}