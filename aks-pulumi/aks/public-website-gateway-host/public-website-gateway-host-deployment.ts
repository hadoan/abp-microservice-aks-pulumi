import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";
import * as pulumi from "@pulumi/pulumi";

export class PublicWebSiteGatewayDeployment {
    config = new pulumi.Config();
    baseName = DeploymentConsts.IDENTITTY_SERVICE_BASE_NAME;
    New() {

        return new k8s.apps.v1.Deployment(this.baseName + "-deployment", {
            metadata: { name: this.baseName },
            spec: {
                selector: { matchLabels: { app: this.baseName } },
                replicas: 1,
                template: {
                    metadata: { labels: { app: this.baseName } },
                    spec: {
                        containers: [
                            {
                                name: this.baseName,
                                image: `${DeploymentConsts.AZURE_CONTAINER_REG_BASE_URL}${this.baseName}:latest`,
                                args: [
                                    "dotnet",
                                    "PublicWebSiteGateway.Host.dll"
                                ],
                                volumeMounts: [
                                    {
                                        name: this.baseName + "-volume",
                                        mountPath: "/etc/config"
                                    }
                                ],
                                imagePullPolicy: "Always"
                            }
                        ],
                        volumes: [
                            {
                                name: this.baseName + "-volume",
                                configMap: { name: this.baseName }
                            }
                        ]
                    }
                }
            }
        });
    }
}



