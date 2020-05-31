import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";
import { DeploymentConsts } from './common/consts';
import * as sql from './databases/sql-deployments';
import * as aks from './aks/aks-deployment';
import * as rabbitmq from './aks/rabbitmq-deployment';
import * as mongodb from './aks/mongodb-deployment';
import * as elasticsearch from './aks/elasticserach-deployment';
import * as redis from './aks/redis-deployment';
import * as registry from './container-registry/container-registry';
import * as authServer from './aks/auth-server-host';
import * as ingress from './aks/nginx-ingress';

const resourceGroupName = "resource-group-" + DeploymentConsts.APP_NAME;
const resourceGroup = new azure.core.ResourceGroup(resourceGroupName, {
    name: resourceGroupName,
    location: "SoutheastAsia"
});

// Deploy database
const sqlServer = sql.newSqlServer(resourceGroup);
const identityDb = sql.newIdentityDb(resourceGroup, sqlServer);
const productDb = sql.newProductDb(resourceGroup, sqlServer);

// Deploy container registry
const containerRegistry = registry.newContainerRegistry(resourceGroup);

//Deploy AKS
const aksCluster = aks.newAks(resourceGroup);

//Deploy ElasticSearch, MongoDb, RabbitMq
rabbitmq.newRabbitMq();
mongodb.newMongodb();
elasticsearch.newElasticSearch();
redis.newRedis();

//Deploy k8s
new authServer.AuthServerConfig().New();
new authServer.AuthServerDeployment().New();
new authServer.AuthServerService().New();


//ingress
new ingress.NginxIngressDeployment().NewNginxIngress();
new ingress.IngressService().New();


// Export the connection string for the storage account 
export const appResourceGroupName = resourceGroupName;
