import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";

export class BackendAdminAppGatewayConfig {

  New() {
    const baseName = DeploymentConsts.BACKEND_ADMIN_APP_GATEWAY_BASE_NAME;
    const config = new pulumi.Config();
    const configMap = new k8s.core.v1.ConfigMap(baseName,
      {
        metadata: { name: baseName},
        data: {
          "appsettings.Production.json": `
                    {
                        "ConnectionStrings": {
                          "Default": "Server=localhost;Database=MsDemo_Identity;Trusted_Connection=True;MultipleActiveResultSets=true"
                        },
                        "ElasticSearch": {
                          "Url": "http://localhost:9200"
                        },
                        "Redis": {
                          "Configuration": "127.0.0.1"
                        },
                        "RabbitMQ": {
                          "Connections": {
                            "Default": {
                              "HostName": "localhost"
                            }
                          },
                          "EventBus": {
                            "ClientName": "MsDemo_BackendAdminAppGateway",
                            "ExchangeName": "MsDemo"
                          }
                        },
                        "Logging": {
                          "LogLevel": {
                            "Default": "Warning"
                          }
                        },
                        "AllowedHosts": "*"
                      }
                      
                `
        }
      });
    return configMap;
  }
}