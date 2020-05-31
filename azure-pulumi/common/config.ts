import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";

// Parse and export configuration variables for this stack.
const config = new pulumi.Config();
export const aksPassword = config.require("aks_password");
export const location = config.get("location") || azure.Locations.SouthEastAsia;
export const sshPublicKey = config.require("sshPublicKey");