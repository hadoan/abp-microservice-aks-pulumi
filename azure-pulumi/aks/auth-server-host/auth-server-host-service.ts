import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";

export class AuthServerService {

    New() {
        const config = new pulumi.Config();
        const service = new k8s.core.v1.Service(DeploymentConsts.AUTH_SERVER_BASE_NAME, {
            metadata: {
                name: DeploymentConsts.AUTH_SERVER_BASE_NAME
            },
            spec: {
                selector: { app: DeploymentConsts.AUTH_SERVER_BASE_NAME },
                ports: [
                    {
                        protocol: "TCP",
                        port: 80,
                        targetPort: 80
                    }
                ],
            }
        });

    }
}