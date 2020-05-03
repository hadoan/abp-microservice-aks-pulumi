export class BackendService {

    serviceName = "haulio-zero-backend-service";
    New() {
        const config = new pulumi.Config();
        const namespace = config.require(DeploymentConsts.NamespaceConfigKey);

        const service = new k8s.core.v1.Service(this.serviceName, {
            metadata: {
                name: this.serviceName,
                namespace: namespace
            },
            spec: {
                selector: { app: new BackendDeployment().podName },
                ports: [
                    {
                        protocol: "TCP",
                        port: 80,
                        targetPort: 80
                    }
                ],
                type: "LoadBalancer"
            }
        });
        return service.status.loadBalancer.ingress[0].hostname;
    }
}