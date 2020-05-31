import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";
import * as pulumi from "@pulumi/pulumi";

export class AuthServerDeployment {
    config = new pulumi.Config();
    configMap = DeploymentConsts.AUTH_SERVER_BASE_NAME;
    New() {

        return new k8s.apps.v1.Deployment(DeploymentConsts.AUTH_SERVER_BASE_NAME + "-deployment", {
            metadata: { name: DeploymentConsts.AUTH_SERVER_BASE_NAME },
            spec: {
                selector: { matchLabels: { app: DeploymentConsts.AUTH_SERVER_BASE_NAME } },
                replicas: 1,
                template: {
                    metadata: { labels: { app: DeploymentConsts.AUTH_SERVER_BASE_NAME } },
                    spec: {
                        containers: [
                            {
                                name: DeploymentConsts.AUTH_SERVER_BASE_NAME,
                                image: `${DeploymentConsts.AZURE_CONTAINER_REG_BASE_URL}${DeploymentConsts.AUTH_SERVER_BASE_NAME}:latest`,
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



