/**
 * @name Discord Experiments
 * @author Fired-Cloud
 * @version 2.0.0
 * @description Discord Experiments but fixed. Thanks Discord Devs.
 */
let mod;
let usermod;
let nodes;
let oldGetUser;
class Science {
    constructor() {
    }

    start() {
        let wpRequire;
        window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => {
            wpRequire = req;
        }]);
        let mod;
        mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.Z?.isDeveloper !== "undefined");
        let usermod;
        usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
        let nodes;
        nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes)
        try {
            nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } })
        } catch (e) {
        }
        let oldGetUser;
        oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
        usermod.exports.default.__proto__.getCurrentUser = () => ({ isStaff: () => true })
        nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
        usermod.exports.default.__proto__.getCurrentUser = oldGetUser
    }

    stop() {
        // Perform necessary cleanup or tear down of resources when the plugin is stopped
    }

    onLoad() {
        this.start();
    }

    onUnload() {
        this.stop();
    }
}

module.exports = Science;
