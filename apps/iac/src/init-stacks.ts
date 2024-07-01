import {RemoteBackendStack} from "./stacks"
import {App, Environment} from "aws-cdk-lib";
import {BaseConfig} from "./config";

class InitStacks {
    app: App;
    env: Environment
    config: BaseConfig
    constructor(app: App, env: Environment) {
        this.app = app;
        this.env = env;
        this.config = new BaseConfig({})
        const vpc = this.vpcStack()
    }

    getStackProps(props?: Environment) {
        if(props) {
            return {
                env: props,
            }
        }
        return  {
            env: this.env
        }
    }

    vpcStack(){
        const stackProps = this.getStackProps()
        const remoteBackend = new BaseConfig({})
        const stackName = remoteBackend.autoResourceName('backend-stack')
        return new RemoteBackendStack(this.app, stackName, stackProps, remoteBackend)
    }

}

export default InitStacks
