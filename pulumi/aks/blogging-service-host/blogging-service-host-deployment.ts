import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";
import * as pulumi from "@pulumi/pulumi";

export class BloggingServiceDeployment {
    config = new pulumi.Config();
    configMap = DeploymentConsts.BLOGGING_SERVICE_BASE_NAME;
    New() {

        return new k8s.apps.v1.Deployment(DeploymentConsts.BLOGGING_SERVICE_BASE_NAME + "-deployment", {
            metadata: { name: DeploymentConsts.BLOGGING_SERVICE_BASE_NAME },
            spec: {
                selector: { matchLabels: { app: DeploymentConsts.BLOGGING_SERVICE_BASE_NAME } },
                replicas: 1,
                template: {
                    metadata: { labels: { app: DeploymentConsts.BLOGGING_SERVICE_BASE_NAME } },
                    spec: {
                        containers: [
                            {
                                name: DeploymentConsts.BLOGGING_SERVICE_BASE_NAME,
                                image: `${DeploymentConsts.AZURE_CONTAINER_REG_BASE_URL}${DeploymentConsts.BLOGGING_SERVICE_BASE_NAME}:latest`,
                                args: [
                                    "dotnet",
                                    "BloggingService.Host.dll"
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



