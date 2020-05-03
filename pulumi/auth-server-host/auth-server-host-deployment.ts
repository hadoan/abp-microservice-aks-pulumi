import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../common/consts";
import * as pulumi from "@pulumi/pulumi";

export class BackendDeployment {
    config = new pulumi.Config();
    podName = "auth-server-host";
    imagename = "auth-server-host-image";
    configMap = new BackendConfig().configName;
    New() {

        return new k8s.apps.v1.Deployment(this.podName + "-deployment", {
            metadata: { name: this.podName },
            spec: {
                selector: { matchLabels: { app: this.podName } },
                replicas: 1,
                template: {
                    metadata: { labels: { app: this.podName } },
                    spec: {
                        containers: [
                            {
                                name: this.imagename,
                                image: `${DeploymentConsts.EcrUrlBase}:${this.imagename}`,
                                args: [
                                    "dotnet",
                                    "AuthServer.Host.dll"
                                ],
                                volumeMounts: [
                                    {
                                        name: this.configMap + "-volume",
                                        mountPath: "/etc/config"
                                    }
                                ],
                                imagePullPolicy: "Always"
                            }
                        ],
                        volumes: [
                            {
                                name: this.configMap + "-volume",
                                configMap: { name: this.configMap }
                            }
                        ]
                    }
                }
            }
        });
    }
}



