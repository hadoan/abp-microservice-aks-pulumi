
export class BackendConfig {
    configName = "haulio-zero-configmap";

    New() {
        const config = new pulumi.Config();
        const namespace = config.require(DeploymentConsts.NamespaceConfigKey);
        const configMap = new k8s.core.v1.ConfigMap(this.configName,
            {
                metadata: { name: this.configName, namespace: namespace },
                data: {
                    "appsettings.Production.json": `
                    
                `
                }
            });
        return configMap;
    }
}