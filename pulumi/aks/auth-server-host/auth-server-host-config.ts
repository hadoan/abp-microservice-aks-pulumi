import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { DeploymentConsts } from "../../common/consts";

export class AuthServerConfig {

    New() {
        const config = new pulumi.Config();
        const configMap = new k8s.core.v1.ConfigMap(DeploymentConsts.AUTH_SERVER_BASE_NAME,
            {
                metadata: { name: DeploymentConsts.AUTH_SERVER_BASE_NAME},
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
                            "ClientName": "MsDemo_AuthServer",
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