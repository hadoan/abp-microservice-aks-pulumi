import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";

export class PublicWebSiteService {
    baseName = DeploymentConsts.IDENTITTY_SERVICE_BASE_NAME;;
    New() {
        const config = new pulumi.Config();
        const service = new k8s.core.v1.Service(this.baseName, {
            metadata: {
                name: this.baseName
            },
            spec: {
                selector: { app: this.baseName },
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